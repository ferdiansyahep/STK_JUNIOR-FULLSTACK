### Setup Frontend (Next.js)
Buka terminal baru dan jalankan perintah berikut:
\`\`\`bash
cd frontend

# Install dependencies
npm install

# Buat file environment
cp .env.example .env.local
\`\`\`

---

**Contoh isi `.env.local` di folder `frontend`:**
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

---
## 💻 How to Run (Development Mode)

Untuk menjalankan aplikasi di lingkungan pengembangan (*hot-reloading* aktif):

**Jalankan Frontend Web:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`
*Frontend akan berjalan di `http://localhost:3001` (atau 3000 jika port tersedia)*

Buka browser Anda dan akses URL Frontend untuk mulai menggunakan aplikasi.

---
## 📦 How to Run (Production Mode)

Jika Anda ingin mem-build dan menjalankan aplikasi dalam mode produksi yang dioptimalkan:

**Build & Run Frontend:**
\`\`\`bash
cd frontend
npm run build
npm start
\`\`\`

---