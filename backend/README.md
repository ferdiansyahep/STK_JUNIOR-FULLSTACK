### Setup Backend (NestJS)
Buka terminal dan jalankan perintah berikut:
\`\`\`bash
cd backend

# Install dependencies
npm install

# Buat file environment
cp .env.example .env
\`\`\`

**Contoh isi `.env` di folder `backend`:**
\`\`\`env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=stk_db
\`\`\`

## 💻 How to Run (Development Mode)

Untuk menjalankan aplikasi di lingkungan pengembangan (*hot-reloading* aktif):

**Jalankan Backend API:**
\`\`\`bash
cd backend
npm run start:dev
\`\`\`
*Backend akan berjalan di `http://localhost:3000`*

## 📦 How to Run (Production Mode)

Jika Anda ingin mem-build dan menjalankan aplikasi dalam mode produksi yang dioptimalkan:

**Build & Run Backend:**
\`\`\`bash
cd backend
npm run build
npm run start:prod
\`\`\`