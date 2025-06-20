# Ngoostadz

Ngoostadz adalah platform pembelajaran Islam berbasis AI yang dirancang untuk memberikan akses mudah dan terpercaya terhadap pengetahuan agama. Aplikasi ini dilengkapi dengan chatbot cerdas yang dapat menjawab pertanyaan-pertanyaan seputar Islam, serta menyajikan hadits dan kutipan Islami harian untuk memperkaya wawasan Anda.

## Fitur Utama

- **Chatbot Islami**: Ajukan pertanyaan apa saja tentang Islam dan dapatkan jawaban instan dari AI yang dirujuk dari sumber-sumber terpercaya.
- **Hadits Harian**: Dapatkan hadits shahih beserta perawi dan nomornya setiap hari untuk menambah pengetahuan Anda.
- **Quote Islami**: Mulai hari Anda dengan kutipan-kutipan inspiratif yang memotivasi.
- **Antarmuka Modern**: Desain yang bersih dan modern untuk pengalaman belajar yang nyaman.

## Teknologi yang Digunakan

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Go (Golang), Gin
- **AI**: Google Gemini

## Instalasi dan Menjalankan Proyek

Untuk menjalankan proyek ini di lingkungan lokal Anda, ikuti langkah-langkah berikut:

### Prasyarat

-   [Go](https://golang.org/doc/install) (versi 1.20 atau lebih baru)
-   [Node.js](https://nodejs.org/en/download/) (versi 18 atau lebih baru)
-   API Key untuk [Google Gemini](https://aistudio.google.com/app/apikey)

### Backend

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/thisloadme/ngoostadz.git
    cd ngoostadz
    ```

2.  **Masuk ke direktori backend:**
    ```bash
    cd backend
    ```

3.  **Buat file `.env`** dan tambahkan variabel lingkungan berikut:
    ```
    GEMINI_API_KEY="API_KEY_ANDA"
    API_PORT="8080"
    URL_FRONTEND="http://localhost:3000"
    ```

4.  **Install dependensi dan jalankan server:**
    ```bash
    go mod tidy
    go run main.go
    ```
    Server backend akan berjalan di `http://localhost:8080`.

### Frontend

1.  **Buka terminal baru** dan masuk ke direktori frontend:
    ```bash
    cd frontend
    ```

2.  **Buat file `.env.local`** dan tambahkan variabel lingkungan berikut:
    ```
    NEXT_PUBLIC_API_BASE_URL="http://localhost:8080"
    ```

3.  **Install dependensi dan jalankan aplikasi:**
    ```bash
    npm install
    npm run dev
    ```
    Aplikasi frontend akan berjalan di `http://localhost:3000`.