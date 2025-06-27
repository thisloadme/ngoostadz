package handler

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/google/generative-ai-go/genai"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type QuoteResponse struct {
	Quote string `json:"quote"`
}

func QuoteHandler(w http.ResponseWriter, r *http.Request) {
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

	// Initialize Gemini client
	client, err := genai.NewClient(ctx, option.WithAPIKey(geminiAPIKey))
	if err != nil {
		http.Error(w, "Failed to initialize AI client", http.StatusInternalServerError)
		return
	}
	defer client.Close()

	// Get the model
	model := client.GenerativeModel("gemini-2.0-flash")

	// Set the prompt
	prompt := "Kamu adalah guru berpaham salafiyah. Berikan sebuah quote islam untuk memotivasi user. Respon HANYA dengan quote nya saja"

	// Generate response
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		http.Error(w, "Failed to generate quote", http.StatusInternalServerError)
		return
	}

	// Get the response text
	quote := resp.Candidates[0].Content.Parts[0].(genai.Text)

	// Set response headers
	w.Header().Set("Content-Type", "application/json")

	// Send response
	json.NewEncoder(w).Encode(QuoteResponse{
		Quote: string(quote),
	})
}
