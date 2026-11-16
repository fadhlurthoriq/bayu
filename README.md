# Komdigi-inspired starter template

Starter template multi-page berbasis HTML, Tailwind CSS (CDN), CSS tambahan, dan JavaScript vanilla.

## Struktur
- `index.html` — beranda
- `pages/` — profil, berita, layanan, kontak
- `assets/css/styles.css` — komponen dan styling tambahan
- `assets/js/main.js` — header/footer bersama, navigasi, tema, animasi, pencarian berita, form demo

## Menjalankan
1. Ekstrak ZIP.
2. Buka folder di VS Code.
3. Jalankan dengan ekstensi Live Server (disarankan), lalu buka `index.html`.
4. Bisa juga memakai server lokal sederhana, misalnya `python -m http.server 5500`, lalu buka `http://localhost:5500`.

Tailwind CSS dan Google Fonts dimuat melalui CDN, jadi koneksi internet diperlukan saat pengembangan.

## Mengubah identitas
- Ganti teks `NUSA DIGITAL` dan inisial `ND` pada `assets/js/main.js`.
- Ubah warna `brand` pada konfigurasi Tailwind di masing-masing HTML.
- Ubah konten placeholder, gambar, alamat, email, dan tautan.
- Tambahkan halaman baru di `pages/`, lalu daftarkan navigasinya di `navItems` pada `assets/js/main.js`.

## Catatan
- Ini adalah template frontend. Belum ada backend, database, CMS, atau pengiriman formulir.
- Routing menggunakan beberapa file HTML dan tautan antarhalaman (bukan SPA router).
- Gambar contoh berasal dari Unsplash; ganti dengan aset milik sendiri untuk produksi.
- Tailwind CDN cocok untuk prototipe. Untuk produksi, pertimbangkan Tailwind CLI/build agar CSS lebih optimal.
