# Sistem Cuaca Jombang - Aplikasi Gabungan

Aplikasi web Node.js yang menggabungkan 2 sistem:
1. **Monitoring Real-Time** - Dashboard monitoring cuaca real-time Desa Ngampungan Jombang
2. **Prediksi Cuaca** - Prakiraan cuaca untuk seluruh wilayah Kabupaten Jombang berdasarkan data BMKG

## 🌟 Fitur

### Halaman Utama (Landing Page)
- Tampilan modern dengan pilihan 2 sistem
- Navigasi mudah antar halaman

### Monitoring Real-Time (`/monitoring`)
- Dashboard monitoring cuaca dari Grafana
- Data real-time meliputi:
  - 💧 Curah Hujan
  - 🌡️ Tekanan Udara
  - 💦 Kelembaban
  - 🌡️ Suhu Temperatur
  - 💨 Kecepatan Angin
  - 🧭 Arah Angin
- Pilihan rentang waktu (15 menit - 30 hari)
- Auto-refresh setiap 5 menit
- Tombol manual refresh

### Prediksi Cuaca (`/prediksi`)
- Prakiraan cuaca berdasarkan data BMKG
- Pilihan wilayah untuk seluruh Kabupaten Jombang
- Prakiraan 3 hari ke depan
- Detail cuaca per 3 jam
- Informasi lengkap: suhu, kelembaban, kecepatan angin, arah angin, jarak pandang

## 📦 Instalasi

1. Masuk ke folder aplikasi:
```powershell
cd "c:\Users\Acer\OneDrive - Universitas Brawijaya\Documents\jombang\jombang-combined-fix\combined-app"
```

2. Install dependencies:
```powershell
npm install
```

## 🚀 Menjalankan Aplikasi

```powershell
npm start
```

Server akan berjalan di `http://localhost:3000`

## 📍 URL Akses

- **Halaman Utama**: http://localhost:3000
- **Monitoring Real-Time**: http://localhost:3000/monitoring
- **Prediksi Cuaca**: http://localhost:3000/prediksi

## 📁 Struktur Folder

```
combined-app/
├── server.js                 # Server Node.js dengan Express
├── package.json              # Dependencies dan konfigurasi npm
├── README.md                 # Dokumentasi
└── public/                   # Folder public untuk file static
    ├── monitoring/           # Halaman monitoring real-time
    │   ├── index.html
    │   ├── script.js
    │   ├── style.css
    │   └── config.min.js
    └── prediksi/             # Halaman prediksi cuaca
        ├── index.html
        ├── script.js
        └── style.css
```

## 🔧 Teknologi yang Digunakan

- **Backend**: Node.js + Express
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Data Source**: 
  - Grafana Dashboard (Monitoring Real-Time)
  - API BMKG (Prediksi Cuaca)

## 👥 Tim Pengembang

Universitas Brawijaya - Dari Kampus untuk Negeri

## 📄 Lisensi

MIT License

## 📞 Kontak

Untuk pertanyaan atau masalah, silakan hubungi tim pengembang Universitas Brawijaya.

---

© 2025 Sistem Cuaca Jombang - Universitas Brawijaya. All rights reserved.
