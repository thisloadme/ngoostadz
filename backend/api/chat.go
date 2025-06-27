package handler

import (
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

const geminiAPIURL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

type GeminiPart struct {
	Text string `json:"text"`
}

type GeminiContent struct {
	Role  string       `json:"role"`
	Parts []GeminiPart `json:"parts"`
}

type GeminiRequest struct {
	Contents []GeminiContent `json:"contents"`
}

type GeminiResponse struct {
	Candidates []struct {
		Content struct {
			Parts []struct {
				Text string `json:"text"`
			} `json:"parts"`
		} `json:"content"`
	} `json:"candidates"`
}

func ChatHandler(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight requests
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Only allow POST method
	if r.Method != "POST" {
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

	var request struct {
		Messages []struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		} `json:"messages"`
	}

	// Parse JSON request body
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
		return
	}

	instruction := `Kamu berperan sebagai pengajar agama Islam berpaham salafiyah lulusan Mekkah dan Madinah yang menjunjung tinggi Al-Qur'an dan Hadits Shahih.

Ketentuan:
- Jawab dengan bahasa Indonesia. Katakan tidak mengerti jika pertanyaan user bertanya dalam bahasa selain Indonesia.
- Responlah langsung ke pembahasan, tanpa basa-basi. Gunakan bahasa yang serius tapi santai.
- Tidak perlu menyebut asal referensi artikel, nama website, ataupun kata-kata seperti salafiyah.
- Jika konteks pertanyaan diluar tema artikel-artikel di website tersebut, maka jawab saja kamu tidak tahu.
- Jika kamu tidak tahu jawaban, maka jawab saja kamu tidak tahu. Tidak perlu klarifikasi atau memberi alasan tidak tahu.`

	contents := []GeminiContent{
		{
			Role:  "user",
			Parts: []GeminiPart{{Text: instruction}},
		},
	}

	// Add chat history
	for _, msg := range request.Messages {
		role := "user"
		if msg.Role == "assistant" {
			role = "model"
		}
		contents = append(contents, GeminiContent{
			Role:  role,
			Parts: []GeminiPart{{Text: msg.Content}},
		})
	}

	responseText, err := callGeminiAPIWithContents(contents, geminiAPIKey)
	if err != nil {
		http.Error(w, "Internal server error: "+err.Error(), http.StatusInternalServerError)
		return
	}

	// Set response headers
	w.Header().Set("Content-Type", "application/json")

	// Create response
	response := map[string]interface{}{
		"response": responseText,
	}

	// Encode and send response
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Error encoding response", http.StatusInternalServerError)
		return
	}
}

func callGeminiAPIWithContents(contents []GeminiContent, apiKey string) (string, error) {
	if apiKey == "" {
		return "", os.ErrNotExist
	}

	reqBody := GeminiRequest{
		Contents: contents,
	}

	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	url := geminiAPIURL + "?key=" + apiKey
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var geminiResp GeminiResponse
	if err := json.Unmarshal(body, &geminiResp); err != nil {
		return "", err
	}

	if len(geminiResp.Candidates) > 0 && len(geminiResp.Candidates[0].Content.Parts) > 0 {
		return geminiResp.Candidates[0].Content.Parts[0].Text, nil
	}

	return "Tidak ada respon dari Gemini.", nil
}
