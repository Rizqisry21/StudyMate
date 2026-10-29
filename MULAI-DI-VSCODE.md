# Menjalankan StudyMate di VS Code

Source ini mencakup landing cinematic, semua gambar, serta aplikasi demo StudyMate.

1. Install Node.js 24 LTS dari https://nodejs.org/en/download lalu buka ulang VS Code.
2. Extract ZIP ini, lalu File > Open Folder > pilih folder StudyMate yang berisi package.json.
3. Buka Terminal > New Terminal. Untuk Windows, Command Prompt bisa dipilih lewat menu dropdown terminal.
4. Jalankan:

```sh
npm install -g pnpm@11.25.0
pnpm install --frozen-lockfile
pnpm dev
```

5. Buka http://localhost:5173 atau alamat yang tercetak di terminal. Simpan perubahan kode untuk memperbarui preview. Hentikan server dengan Ctrl+C.

Project memerlukan Node.js >=22.13.0. pnpm dikunci ke 11.25.0 sesuai package.json. Jangan memakai Live Server untuk menjalankan aplikasi ini. Koneksi internet dibutuhkan saat pemasangan dependensi.

## File yang biasa diedit

- app/cinematic-opening.tsx: konten opening perpustakaan dan matching.
- app/cinematic.css: gaya dan tampilan opening.
- app/scroll-story.ts: urutan serta progres animasi scroll.
- app/landing.tsx: bagian landing setelah opening.
- app/scroll-story.css: gaya walkthrough produk.
- app/globals.css: gaya umum.
- app/workspace.tsx: dashboard dan fitur demo.
- app/data.ts: data profil dan perhitungan compatibility.
- public/scenes/: dua gambar perpustakaan.
- public/portraits/: gambar profil.

## Catatan

ZIP berisi source, konfigurasi, dan lockfile; folder node_modules akan dibuat oleh pnpm install. Mode portable dipilih otomatis tanpa konfigurasi lingkungan ChatGPT. Demo ini menyimpan akun, chat, dan sesi di browser, belum menggunakan backend multi-user. Perubahan lokal tidak otomatis memperbarui website online.

Pemeriksaan build dan browser dilakukan di lingkungan Linux. Instalasi di Windows belum diuji langsung.
