# Software Design Document (SDD)

## Desain UI/UX Sistem Arsip Digital Berbasis Web dengan Fitur Pencarian QR Code

### 1. Pendahuluan

Dokumen ini mendefinisikan rancangan UI/UX untuk Sistem Arsip Digital Berbasis Web dengan fitur QR Code. Fokus desain diarahkan pada tampilan yang lebih modern, lebih hidup, dan lebih profesional dibanding dashboard administrasi polos, namun tetap sesuai konteks instansi pemerintahan: formal, tegas, rapi, dan mudah digunakan oleh pegawai non-teknis.

---

### 2. Sasaran Desain

1. Membuat antarmuka yang terasa modern, premium, dan tidak membosankan.
2. Menyusun pengalaman pengguna yang cepat, intuitif, dan minim langkah.
3. Meningkatkan kenyamanan visual melalui warna yang lebih berkarakter.
4. Membuat sistem terasa “hidup” lewat card, gradient, highlight, icon, dan state yang jelas.
5. Menyediakan desain yang langsung dapat diimplementasikan ke Next.js + Tailwind CSS + shadcn/ui.

---

### 3. Arah Visual (Visual Direction)

Desain tidak menggunakan warna datar yang terlalu polos. Pendekatan visual yang dipakai adalah:

* **Modern Government Dashboard**: formal tetapi tidak kaku.
* **Layered UI**: background, surface, card, dan panel memiliki kedalaman visual.
* **Gradient Accents**: warna aksen dipakai pada header, KPI card, button utama, dan highlight.
* **Soft Shadow + Border Glow**: memberi kesan lebih premium tanpa berlebihan.
* **Rounded Corners**: kontainer, card, modal, dan tombol menggunakan radius konsisten.
* **High Contrast Hierarchy**: fokus visual diarahkan ke action utama dan data penting.

---

### 4. Tone and Personality UI

Sistem harus memunculkan kesan:

* profesional
* terpercaya
* tegas
* modern
* informatif
* bersih
* tidak kaku

Tampilan tidak boleh terlihat seperti aplikasi CRUD standar. Setiap halaman harus memiliki karakter visual yang jelas, terutama pada dashboard, daftar arsip, detail arsip, dan scan QR.

---

### 5. Design System

## 5.1 Warna Utama

Palet warna dibuat lebih berlapis agar UI tidak terlihat datar.

### Primary Palette

| Token       |     HEX | Fungsi                  |
| ----------- | ------: | ----------------------- |
| primary-50  | #EEF4FF | Background lembut       |
| primary-100 | #DBEAFE | Hover ringan            |
| primary-200 | #BFDBFE | Border aksen            |
| primary-300 | #93C5FD | Secondary accent        |
| primary-400 | #60A5FA | Highlight               |
| primary-500 | #3B82F6 | Primary button          |
| primary-600 | #2563EB | Primary strong          |
| primary-700 | #1D4ED8 | Header / sidebar active |
| primary-800 | #1E40AF | Strong surface          |
| primary-900 | #172554 | Dark accent             |

### Secondary Palette

| Token         |     HEX | Fungsi               |
| ------------- | ------: | -------------------- |
| secondary-50  | #ECFEFF | Soft cyan background |
| secondary-100 | #CFFAFE | Accent hover         |
| secondary-200 | #A5F3FC | Accent border        |
| secondary-300 | #67E8F9 | Info highlight       |
| secondary-500 | #06B6D4 | Info button / badge  |
| secondary-700 | #0E7490 | Strong accent        |

### Accent Palette

| Token      |     HEX | Fungsi                 |
| ---------- | ------: | ---------------------- |
| accent-50  | #F5F3FF | Soft violet background |
| accent-100 | #EDE9FE | Card glow              |
| accent-300 | #C4B5FD | Decorative accent      |
| accent-500 | #8B5CF6 | Special highlight      |
| accent-700 | #6D28D9 | Emphasis               |

### Semantic Palette

| Token   |     HEX | Fungsi        |
| ------- | ------: | ------------- |
| success | #22C55E | Berhasil      |
| warning | #F59E0B | Perhatian     |
| danger  | #EF4444 | Error / hapus |
| info    | #0EA5E9 | Informasi     |

### Neutral Palette

| Token       |     HEX | Fungsi           |
| ----------- | ------: | ---------------- |
| neutral-50  | #F8FAFC | Background utama |
| neutral-100 | #F1F5F9 | Surface lembut   |
| neutral-200 | #E2E8F0 | Border           |
| neutral-300 | #CBD5E1 | Divider          |
| neutral-500 | #64748B | Teks sekunder    |
| neutral-700 | #334155 | Teks utama       |
| neutral-900 | #0F172A | Judul kuat       |

### Background Style

Rekomendasi background bukan putih polos, melainkan:

* gradient halus dari `neutral-50` ke `primary-50`
* overlay bentuk abstrak transparan di area dashboard
* panel card dengan white surface dan border tipis

Contoh visual style:

* header menggunakan gradient `primary-700 → primary-500`
* card KPI memakai gradient halus atau tinted background
* area utama menggunakan background terang dengan depth yang lembut

---

## 5.2 Tipografi

Font utama yang disarankan:

* **Inter** atau **Plus Jakarta Sans**

### Skala Tipografi

| Elemen  |  Ukuran |  Weight | Fungsi                       |
| ------- | ------: | ------: | ---------------------------- |
| Display | 36–40px |     700 | Judul hero / dashboard utama |
| H1      |    28px |     700 | Judul halaman                |
| H2      |    22px |     600 | Subjudul section             |
| H3      |    18px |     600 | Heading card                 |
| Body    |    16px | 400–500 | Isi utama                    |
| Small   |    14px |     400 | Metadata                     |
| Caption |    12px |     400 | Keterangan kecil             |

### Tipografi Rules

* Judul halaman harus tegas dan ringkas.
* Metadata arsip ditampilkan dengan ukuran lebih kecil dan warna netral.
* Angka statistik pada dashboard harus lebih menonjol daripada labelnya.

---

## 5.3 Spacing System

Gunakan skala spacing konsisten:

* 4px
* 8px
* 12px
* 16px
* 20px
* 24px
* 32px
* 40px
* 48px

Prinsip:

* jarak antar komponen tidak terlalu rapat
* form diberi ruang napas yang cukup
* card dan section dipisahkan dengan whitespace yang jelas

---

## 5.4 Radius dan Shadow

### Radius

| Komponen | Radius |
| -------- | -----: |
| Button   |   10px |
| Input    |   12px |
| Card     |   16px |
| Modal    |   20px |
| Badge    |  999px |

### Shadow

* Shadow ringan untuk input dan card.
* Shadow medium untuk modal dan dropdown.
* Shadow kuat hanya untuk elemen penting seperti floating action atau panel aktif.

---

## 5.5 Icon System

* Gunakan **Lucide React**.
* Icon ukuran standar: 18px, 20px, 24px.
* Ikon harus konsisten, linear, dan modern.
* Setiap menu memiliki ikon yang mudah dikenali.

---

## 6. Layout System

### 6.1 Struktur Utama Desktop

* **Sidebar kiri**: navigasi utama.
* **Topbar**: pencarian, profil, aksi cepat.
* **Main content**: area kerja.
* **Right panel opsional**: aktivitas terbaru atau quick insights.

### 6.2 Struktur Mobile

* Sidebar berubah menjadi drawer.
* Konten disusun satu kolom.
* Tombol aksi utama dibuat sticky atau mudah dijangkau.

### 6.3 Grid System

* Desktop: 12 column grid
* Tablet: 8 column grid
* Mobile: 4 column grid

---

## 7. Halaman dan Rancangan UI/UX

### 7.1 Halaman Login

#### Tujuan

Menciptakan pengalaman masuk yang bersih, cepat, dan meyakinkan.

#### Tampilan

* panel login dengan card transparan lembut
* background gradient modern
* logo instansi atau logo aplikasi
* judul aplikasi yang kuat
* input username dan password
* tombol login utama dengan warna dominan

#### UX Notes

* tampilkan password toggle
* error message harus spesifik
* tombol login menampilkan loading state

---

### 7.2 Dashboard

#### Tujuan

Memberikan ringkasan cepat tentang kondisi arsip.

#### Komponen UI

* hero header dengan gradient halus
* 4 kartu KPI berwarna berbeda namun harmonis
* grafik ringkas / ringkasan statistik
* recent activity
* quick action cards

#### KPI Card yang disarankan

* Total Arsip
* Surat Masuk
* Surat Keluar
* Arsip Hari Ini

#### Visual Treatment

* angka besar, label kecil
* ikon dekoratif di pojok kartu
* background kartu tidak monoton
* gunakan tinted background untuk tiap kartu agar dashboard hidup

---

### 7.3 Halaman Daftar Arsip

#### Tujuan

Menampilkan data arsip dengan cepat dan nyaman dibaca.

#### Komponen UI

* search bar besar
* filter kategori
* filter tanggal
* tombol tambah arsip
* tabel / data grid
* pagination

#### Visual Treatment

* header tabel memakai background solid lembut
* row hover memiliki highlight halus
* status arsip ditampilkan sebagai badge warna
* aksi utama memakai ikon + teks singkat

#### UX Notes

* pencarian harus terasa instan
* jika data banyak, tambahkan sticky table header
* dukung empty state yang menarik, bukan kosong polos

---

### 7.4 Halaman Tambah / Edit Arsip

#### Tujuan

Membuat proses input data terasa cepat dan tidak melelahkan.

#### Komponen UI

* form dalam card yang lebar
* field tersusun rapi dua kolom di desktop
* file uploader dengan preview
* kategori dropdown yang jelas
* tombol simpan utama yang dominan

#### UX Notes

* gunakan label yang jelas dan singkat
* field wajib diberi indikator warna
* error message muncul inline
* gunakan autosave indikator jika diperlukan

#### Visual Treatment

* form section dipisah dengan divider halus
* tombol simpan diberi warna paling menonjol
* tombol batal dibuat outline / ghost

---

### 7.5 Halaman Detail Arsip

#### Tujuan

Menyediakan tampilan arsip yang informatif dan elegan.

#### Komponen UI

* metadata arsip pada panel kiri
* preview file pada panel kanan
* QR Code pada panel khusus yang menonjol
* tombol unduh file
* tombol unduh / cetak QR
* tombol edit dan hapus

#### Visual Treatment

* gunakan layout split panel
* QR Code ditempatkan dalam card dengan border halus dan latar bersih
* informasi penting diberi label badge

---

### 7.6 Halaman Scan QR Code

#### Tujuan

Membuat fitur scan terasa modern, cepat, dan jelas.

#### Komponen UI

* area kamera berbentuk card besar
* animasi scanning line
* tombol aktifkan kamera
* alternatif input manual
* hasil scan muncul dalam card ringkas

#### UX Notes

* tampilkan instruksi singkat sebelum scan
* jika kamera tidak aktif, beri status yang mudah dipahami
* setelah scan berhasil, auto redirect ke detail arsip

#### Visual Treatment

* gunakan elemen visual scanner dengan glow halus
* fokus utama pada frame kamera
* hasil scan ditampilkan sebagai success state yang menarik

---

### 7.7 Halaman Kategori Arsip

#### Tujuan

Menyederhanakan pengelolaan klasifikasi arsip.

#### Komponen UI

* daftar kategori dalam table/card
* form tambah kategori
* edit dan hapus kategori

#### UX Notes

* kategori harus mudah dibedakan secara visual
* gunakan badge warna untuk membedakan status atau jenis

---

### 7.8 Halaman Pengguna

#### Tujuan

Mengelola akun dan role secara terstruktur.

#### Komponen UI

* tabel pengguna
* role badge
* tombol tambah pengguna
* reset password
* nonaktifkan akun

#### UX Notes

* role harus terlihat jelas
* aksi berisiko harus memakai konfirmasi

---

### 7.9 Halaman Log Aktivitas

#### Tujuan

Memberikan jejak aktivitas sistem untuk monitoring.

#### Komponen UI

* tabel log
* filter waktu
* filter user
* filter aksi

#### Visual Treatment

* log dibuat bersih dan mudah dipindai
* gunakan badge warna untuk tipe aktivitas

---

## 8. Komponen UI Detail

### 8.1 Button

#### Variasi

* Primary
* Secondary
* Outline
* Ghost
* Danger
* Icon Button

#### State

* Default
* Hover
* Active
* Disabled
* Loading

### 8.2 Input Field

#### State

* Normal
* Focus
* Error
* Disabled
* Success

### 8.3 Table / Data Grid

#### Fitur

* sorting
* filtering
* pagination
* row actions
* selected state
* loading skeleton

### 8.4 Badge

#### Contoh

* Draft
* Aktif
* Arsip
* Terhapus
* Selesai

### 8.5 Modal / Dialog

#### Digunakan untuk

* konfirmasi hapus
* upload berhasil
* preview QR
* detail cepat

### 8.6 Toast Notification

#### Type

* success
* error
* warning
* info

### 8.7 Empty State

Empty state harus visual dan informatif, bukan hanya teks kosong.
Contoh:

* ilustrasi sederhana
* kalimat penjelas
* tombol aksi langsung

---

## 9. Motion Design

Agar UI terasa hidup, gunakan animasi ringan.

### Prinsip Motion

* durasi singkat
* tidak berlebihan
* mendukung pemahaman pengguna

### Contoh Motion

* hover scale ringan pada card
* fade in untuk modal
* slide up untuk toast
* scan line bergerak pada halaman QR
* highlight aktif pada menu sidebar

---

## 10. UX Writing

Gunakan bahasa singkat, formal, dan tegas.

### Contoh yang disarankan

* “Tambah Arsip”
* “Simpan Perubahan”
* “Scan QR Code”
* “Data berhasil disimpan”
* “Arsip tidak ditemukan”

### Hindari

* teks terlalu panjang
* istilah teknis yang tidak perlu
* pesan error yang umum dan tidak membantu

---

## 11. Responsive Behaviour

### Desktop

* sidebar penuh
* table lengkap
* form dua kolom

### Tablet

* sidebar menyempit
* form tetap nyaman dibaca
* card menyesuaikan lebar

### Mobile

* drawer menu
* komponen satu kolom
* tombol utama besar dan mudah ditekan

---

## 12. Accessibility

* kontras warna harus aman
* fokus keyboard harus terlihat jelas
* semua field memiliki label
* icon tidak boleh menjadi satu-satunya penanda
* ukuran teks harus tetap terbaca di layar kecil

---

## 13. Error and Recovery State

### Error State

* gagal login
* gagal upload file
* data tidak ditemukan
* kamera tidak aktif
* QR tidak valid

### Recovery State

* tombol coba lagi
* kembali ke dashboard
* upload ulang file
* aktifkan kamera kembali

---

## 14. Perasaan Pengguna yang Ditargetkan

Saat menggunakan sistem, pengguna harus merasakan:

* lebih cepat daripada arsip manual
* lebih jelas daripada spreadsheet biasa
* lebih modern daripada CRUD polos
* lebih aman dan rapi
* lebih percaya diri saat mencari arsip

---

## 15. Implementasi Teknis yang Disarankan

Agar desain mudah diwujudkan dalam Next.js, struktur komponen disarankan seperti berikut:

* `AppShell`
* `Sidebar`
* `Topbar`
* `HeroHeader`
* `StatsCard`
* `ArchiveTable`
* `ArchiveForm`
* `ArchiveDetail`
* `QRCodeCard`
* `QRScannerPanel`
* `ConfirmDialog`
* `Toast`

---

## 16. Quality Criteria

Desain UI/UX dianggap berhasil jika:

1. Tampilan tidak terasa datar atau polos.
2. Warna visual lebih hidup namun tetap formal.
3. Pengguna memahami menu utama dalam hitungan detik.
4. Scan QR dan detail arsip mudah diakses.
5. Admin dan pegawai dapat bekerja tanpa kebingungan.

---

## 17. Ringkasan Desain

SDD ini menempatkan sistem arsip digital bukan sebagai aplikasi CRUD biasa, tetapi sebagai dashboard administrasi modern dengan identitas visual yang lebih kuat. Warna dibuat berlapis, panel lebih hidup, card lebih ekspresif, dan pengalaman pengguna dirancang agar terasa modern, profesional, serta nyaman dipakai oleh instansi pemerintahan.
