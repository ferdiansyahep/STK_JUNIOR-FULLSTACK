# STK - Fullstack Menu Tree System

Aplikasi fullstack untuk manajemen *hierarchical menu tree* dengan dukungan kedalaman tak terbatas (*unlimited depth*). Dibangun khusus untuk Technical Test Solusi Teknologi Kreatif (STK) menggunakan **NestJS** (Backend) dan **Next.js** (Frontend).

## 🛠️ Technology Choices & Architecture

- **Backend:** NestJS (TypeScript) + TypeORM
  - *Alasan:* Arsitektur modular yang kuat, *dependency injection* bawaan, dan sangat cepat untuk men-generate RESTful API beserta dokumentasi Swagger secara otomatis.
- **Database:** MySQL
  - *Arsitektur Data:* Menggunakan pola **Adjacency List** (`id`, `name`, `parentId`, `depth`). Pola ini dipilih karena sangat efisien untuk operasi CRUD pada struktur data *tree* bersarang (nested) di database relasional.
- **Frontend:** Next.js (App Router) + Tailwind CSS + Zustand
  - *Alasan:* Next.js App Router memberikan performa rendering yang baik. Zustand dipilih sebagai *state management* karena jauh lebih ringan dan minim *boilerplate* dibandingkan Redux. Antarmuka *tree* dibangun menggunakan **Recursive React Component** untuk menangani *unlimited depth* secara dinamis.

---

## 📂 Struktur Direktori Utama

\`\`\`text
STK_FULLSTACK/
├── backend/                # Source code API NestJS
│   ├── .env.example        # Template environment backend
│   └── src/                
├── frontend/               # Source code antarmuka Next.js
│   ├── .env.example        # Template environment frontend
│   ├── app/                # Main layout & pages
│   ├── components/         # Reusable components (termasuk Recursive Tree)
│   └── store/              # Zustand state management
├── database_schema.sql     # Skema tabel database mentah
└── README.md               # Dokumentasi ini
\`\`\`

---

## ⚙️ Prerequisites (Persyaratan Sistem)

Sebelum memulai, pastikan sistem Anda memiliki:
- **Node.js** (v18.x atau terbaru)
- **MySQL Server** (bisa menggunakan XAMPP, Laragon, DBngin, atau MySQL Native)
- **Git**

---

## 🚀 Setup Instructions (Cara Instalasi)

### 1. Setup Database
1. Pastikan layanan MySQL Anda sudah berjalan di port `3306`.
2. Buat database baru bernama `stk_db`:
   \`\`\`sql
   CREATE DATABASE stk_db;
   \`\`\`
   *(Catatan: Aplikasi ini menggunakan `synchronize: true` pada TypeORM di mode development, sehingga tabel `menus` akan di-generate secara otomatis saat backend pertama kali dijalankan. Skema mentah juga tersedia di file `database_schema.sql` untuk referensi).*

### 2. Setup Backend (NestJS)
Buka terminal dan jalankan perintah berikut:
\`\`\`bash
cd backend

# Install dependencies
npm install

# Buat file environment
cp .env.example .env
\`\`\`

### 3. Setup Frontend (Next.js)
Buka terminal baru dan jalankan perintah berikut:
\`\`\`bash
cd frontend

# Install dependencies
npm install

# Buat file environment
cp .env.example .env.local
\`\`\`

---

## 🔐 Environment Variables (.env)

Pastikan file `.env` (di backend) dan `.env.local` (di frontend) sudah terisi sesuai dengan konfigurasi lokal Anda.

**Contoh isi `.env` di folder `backend`:**
\`\`\`env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=stk_db
\`\`\`

**Contoh isi `.env.local` di folder `frontend`:**
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

---

## 💻 How to Run (Development Mode)

Untuk menjalankan aplikasi di lingkungan pengembangan (*hot-reloading* aktif):

**1. Jalankan Backend API:**
\`\`\`bash
cd backend
npm run start:dev
\`\`\`
*Backend akan berjalan di `http://localhost:3000`*

**2. Jalankan Frontend Web:**
\`\`\`bash
cd frontend
npm run dev
\`\`\`
*Frontend akan berjalan di `http://localhost:3001` (atau 3000 jika port tersedia)*

Buka browser Anda dan akses URL Frontend untuk mulai menggunakan aplikasi.

---

## 📦 How to Run (Production Mode)

Jika Anda ingin mem-build dan menjalankan aplikasi dalam mode produksi yang dioptimalkan:

**1. Build & Run Backend:**
\`\`\`bash
cd backend
npm run build
npm run start:prod
\`\`\`

**2. Build & Run Frontend:**
\`\`\`bash
cd frontend
npm run build
npm start
\`\`\`

---

## 📖 API Documentation (Swagger)

Backend aplikasi ini dilengkapi dengan dokumentasi OpenAPI (Swagger) interaktif. Untuk melihat dan menguji endpoint secara langsung:

1. Pastikan server **Backend** sedang berjalan.
2. Buka browser dan kunjungi:  
   👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**


## Screenshot

**1. Main Dashboard & Menu Tree**
![Main Dashboard]
(Dashboard & Menu Tree.png)

**2. Form Menu Create & Update**
![Edit Menu]
(Form Create & Update.png)

**3. Swagger API Documentation**
![Main Dashboard]
(API Documentation.png)