package handler

type Config struct {
	GeminiAPIKey string
}

type Handler struct {
	config *Config
}

func NewHandler(config *Config) *Handler {
	return &Handler{
		config: config,
	}
}
