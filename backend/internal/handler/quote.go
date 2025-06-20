package handler

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type QuoteResponse struct {
	Quote string `json:"quote"`
}

func (h *Handler) GetQuote(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	// Initialize Gemini client
	client, err := genai.NewClient(ctx, option.WithAPIKey(h.config.GeminiAPIKey))
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Handle preflight request
	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	// Send response
	json.NewEncoder(w).Encode(QuoteResponse{
		Quote: string(quote),
	})
}
