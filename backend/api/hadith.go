package api

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type HadithResponse struct {
	Hadith   string `json:"hadith"`
	Narrator string `json:"narrator"`
	Number   string `json:"number"`
}

func HadithHandler(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Only allow GET method
	if r.Method != "GET" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: Error loading .env file: %v", err)
	}

	// Get Gemini API key
	geminiAPIKey := os.Getenv("GEMINI_API_KEY")
	if geminiAPIKey == "" {
		http.Error(w, "GEMINI_API_KEY environment variable is required", http.StatusInternalServerError)
		return
	}

	ctx := context.Background()

	client, err := genai.NewClient(ctx, option.WithAPIKey(geminiAPIKey))
	if err != nil {
		http.Error(w, "Failed to initialize AI client", http.StatusInternalServerError)
		return
	}
	defer client.Close()

	model := client.GenerativeModel("gemini-2.0-flash")
	model.SafetySettings = []*genai.SafetySetting{
		{
			Category:  genai.HarmCategoryHarassment,
			Threshold: genai.HarmBlockNone,
		},
		{
			Category:  genai.HarmCategoryHateSpeech,
			Threshold: genai.HarmBlockNone,
		},
	}

	prompt := `Sebagai guru salafiyah, berikan satu terjemahan hadits shahih yang singkat beserta perawi dan nomornya. Jawaban harus dalam format JSON seperti ini: {"hadith": "...", "narrator": "...", "number": "..."}. Pastikan hanya JSON yang dikembalikan, tanpa teks tambahan. Jangan menyingkat seperti SAW atau RA, tapi tuliskan kepanjangannya.`

	var hadithResponse HadithResponse

	for {
		resp, err := model.GenerateContent(ctx, genai.Text(prompt))
		if err != nil {
			http.Error(w, "Failed to generate hadith", http.StatusInternalServerError)
			return
		}

		if len(resp.Candidates) > 0 && len(resp.Candidates[0].Content.Parts) > 0 {
			rawResponse := resp.Candidates[0].Content.Parts[0].(genai.Text)

			// Clean the response to ensure it's valid JSON
			jsonString := strings.TrimSpace(string(rawResponse))
			jsonString = strings.TrimPrefix(jsonString, "```json")
			jsonString = strings.TrimPrefix(jsonString, "```")
			jsonString = strings.TrimSuffix(jsonString, "```")
			jsonString = strings.TrimSpace(jsonString)

			err = json.Unmarshal([]byte(jsonString), &hadithResponse)
			if err == nil && hadithResponse.Hadith != "" && hadithResponse.Narrator != "" {
				break
			}
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(hadithResponse)
}
