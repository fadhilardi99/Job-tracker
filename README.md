# JobTracker - Aplikasi Pelacak Lamaran Kerja

<div align="center">
  <img src="public/job-logo.png" alt="JobTracker Logo" width="100" height="100">
  
  **Kelola lamaran kerja Anda dengan mudah dan efisien**
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Firebase](https://img.shields.io/badge/Firebase-9-orange?style=flat&logo=firebase)](https://firebase.google.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
</div>

## 📋 Deskripsi

JobTracker adalah aplikasi web modern yang membantu Anda mengelola dan melacak semua lamaran kerja dalam satu tempat. Dengan antarmuka yang intuitif dan fitur-fitur lengkap, Anda dapat dengan mudah memantau progress aplikasi kerja Anda dari tahap awal hingga mendapat tawaran.

## ✨ Fitur Utama

### 🎯 Dashboard Interaktif
- **Statistik Real-time**: Lihat total lamaran, jumlah interview, tawaran, dan tingkat keberhasilan
- **Grafik Distribusi Status**: Visualisasi progress lamaran dalam bentuk progress bar
- **Daftar Lamaran Terbaru**: Akses cepat ke 3 lamaran terbaru Anda

### 📝 Manajemen Lamaran
- **Tambah Lamaran Baru**: Form lengkap dengan validasi
- **Edit & Update**: Ubah status dan informasi lamaran kapan saja
- **Hapus Lamaran**: Kelola data dengan aman

### 🔍 Pencarian & Filter
- **Pencarian Real-time**: Cari berdasarkan nama perusahaan atau posisi
- **Filter Status**: Tampilkan lamaran berdasarkan status tertentu
- **Tampilan Grid**: Layout responsif untuk semua perangkat

### 📊 Pelacakan Status
- **Applied** (Dilamar): Status awal setelah mengirim lamaran
- **Interview**: Tahap wawancara
- **Offer** (Tawaran): Mendapat tawaran kerja
- **Rejected** (Ditolak): Lamaran tidak diterima

## 🛠️ Teknologi yang Digunakan

### Frontend
- **Next.js 14**: React framework dengan App Router
- **TypeScript**: Type safety dan developer experience yang lebih baik
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library yang modern dan konsisten

### Backend & Database
- **Firebase Firestore**: NoSQL database real-time
- **Firebase SDK**: Integrasi cloud services

### Styling & UI
- **Google Fonts (Inter)**: Typography yang clean dan readable
- **Custom CSS Variables**: Theme system yang konsisten
- **Responsive Design**: Optimal di semua ukuran layar
- **Dark Mode Support**: Otomatis mengikuti preferensi sistem

## 🚀 Instalasi & Setup

### Prasyarat
- Node.js (versi 18 atau lebih baru)
- npm atau yarn
- Akun Firebase

### Langkah Instalasi

1. **Clone Repository**
   ```bash
   git clone [repository-url]
   cd job-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup Firebase**
   - Buat project baru di [Firebase Console](https://console.firebase.google.com/)
   - Aktifkan Firestore Database
   - Salin konfigurasi Firebase ke `src/lib/firebase.ts`

4. **Konfigurasi Environment**
   ```bash
   # Buat file .env.local
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   # ... konfigurasi Firebase lainnya
   ```

5. **Jalankan Development Server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

6. **Akses Aplikasi**
   Buka [http://localhost:3000](http://localhost:3000) di browser

## 📱 Cara Menggunakan

### 1. Dashboard
- Melihat statistik keseluruhan lamaran Anda
- Memantau distribusi status dalam bentuk visual
- Mengakses lamaran terbaru dengan cepat

### 2. Menambah Lamaran Baru
- Klik tab "Tambah" di navigasi
- Isi form dengan informasi lengkap:
  - **Perusahaan** (wajib)
  - **Posisi** (wajib)
  - **Status** (default: Dilamar)
  - **Tanggal Lamar** (wajib)
  - **Lokasi** (wajib)
  - **Gaji** (opsional)
  - **URL Lowongan** (opsional)
  - **Catatan** (opsional)

### 3. Mengelola Lamaran
- Gunakan tab "Daftar" untuk melihat semua lamaran
- **Pencarian**: Ketik nama perusahaan atau posisi di search bar
- **Filter**: Pilih status tertentu dari dropdown filter
- **Edit**: Klik ikon pensil untuk mengubah data
- **Hapus**: Klik ikon tempat sampah (dengan konfirmasi)

### 4. Memantau Progress
- Status otomatis tercermin dalam dashboard
- Warna kartu berubah sesuai status:
  - 🔵 **Biru**: Applied
  - 🟡 **Kuning**: Interview
  - 🟢 **Hijau**: Offer
  - 🔴 **Merah**: Rejected

## 📊 Struktur Data

```typescript
interface Job {
  id?: string;
  company: string;        // Nama perusahaan
  position: string;       // Posisi yang dilamar
  status: "applied" | "interview" | "offer" | "rejected";
  appliedDate: string;    // Tanggal melamar
  salary?: string;        // Gaji yang ditawarkan
  location: string;       // Lokasi kerja
  jobUrl?: string;        // URL lowongan
  notes?: string;         // Catatan tambahan
  createdAt: Date;        // Timestamp pembuatan
  updatedAt: Date;        // Timestamp update terakhir
}
```

## 🎨 Kustomisasi

### Theme Colors
Edit variabel CSS di `src/app/globals.css`:
```css
:root {
  --primary: #7f5af0;        /* Warna utama */
  --primary-dark: #6241c6;   /* Warna utama gelap */
  --accent: #2cb67d;         /* Warna aksen */
  --danger: #ff6b6b;         /* Warna bahaya */
}
```

### Font
Ganti font di `src/app/layout.tsx` dan `globals.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700;900&display=swap");
```

## 🔧 Scripts Tersedia

```bash
# Development
npm run dev

# Build untuk production
npm run build

# Jalankan production build
npm start

# Linting
npm run lint
```

## 📁 Struktur Project

```
src/
├── app/
│   ├── globals.css         # Global styles & CSS variables
│   ├── layout.tsx          # Root layout component
│   └── page.tsx            # Main page component
├── components/
│   ├── JobCard.tsx         # Komponen kartu lamaran
│   └── JobForm.tsx         # Komponen form lamaran
├── hooks/
│   └── useJobs.ts          # Custom hook untuk Firebase operations
├── lib/
│   └── firebase.ts         # Konfigurasi Firebase
└── types/
    └── job.ts              # TypeScript interfaces
```

## 🤝 Kontribusi

1. Fork repository ini
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Kontak & Support

Jika Anda mengalami masalah atau memiliki saran:
- Buat issue di GitHub repository
- Email: [your-email@example.com]

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

<div align="center">
  <p>Dibuat dengan ❤️ untuk membantu pencari kerja mengelola lamaran mereka</p>
  <p><strong>Happy Job Hunting! 🎯</strong></p>
</div>
