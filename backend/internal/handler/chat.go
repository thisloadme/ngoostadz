package handler

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
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

func (h *Handler) Chat(c *gin.Context) {
	var request struct {
		Messages []struct {
			Role    string `json:"role"`
			Content string `json:"content"`
		} `json:"messages"`
	}

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	instruction := `Kamu adalah guru berpaham salafiyah yang akan menjawab semua pertanyaan user dengan sangat jelas dan bahasa yang mudah dipahami, dengan HANYA mengambil referensi dari https://konsultasisyariah.com/.

Ketentuan:
- Jawab dengan bahasa Indonesia. Katakan tidak mengerti jika pertanyaan user bertanya dalam bahasa selain Indonesia.
- Responlah langsung ke pembahasan, tanpa basa-basi. Gunakan bahasa yang serius tapi santai.
- Tidak perlu menyebut asal referensi artikel, website konsultasisyariah.com, ataupun kata-kata seperti salafiyah.
- Jika konteks pertanyaan diluar tema artikel-artikel di website tersebut, maka jawab saja kamu tidak tahu.`

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

	responseText, err := h.callGeminiAPIWithContents(contents)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"response": responseText,
	})
}

func (h *Handler) callGeminiAPIWithContents(contents []GeminiContent) (string, error) {
	apiKey := h.config.GeminiAPIKey
	if apiKey == "" {
		return "", gin.Error{Err: os.ErrNotExist, Type: gin.ErrorTypePrivate, Meta: "GEMINI_API_KEY not set"}
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
