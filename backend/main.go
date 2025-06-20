package main

import (
	"islamic_search_engine/backend/internal/handler"
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env file
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	// Get Gemini API key
	geminiAPIKey := os.Getenv("GEMINI_API_KEY")
	if geminiAPIKey == "" {
		log.Fatal("GEMINI_API_KEY environment variable is required")
	}

	// Initialize handler
	config := &handler.Config{
		GeminiAPIKey: geminiAPIKey,
	}
	h := handler.NewHandler(config)

	// Initialize Gin
	r := gin.Default()

	// Configure CORS
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{os.Getenv("URL_FRONTEND")}
	corsConfig.AllowMethods = []string{"GET", "POST", "OPTIONS"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Type", "Authorization"}
	r.Use(cors.New(corsConfig))

	// Set up routes
	api := r.Group("/api")
	{
		api.POST("/chat", h.Chat)
		api.GET("/quote", gin.WrapF(h.GetQuote))
		api.GET("/hadith", gin.WrapF(h.GetHadith))
	}

	// Start server
	port := os.Getenv("API_PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Server starting on :%s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
