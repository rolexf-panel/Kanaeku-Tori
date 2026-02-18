# 🎌 Kanaeku Tori-Bot
### 金明く鳥ボット - Bot Telegram Modular Bertema Jepang

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-FF6B9D?style=for-the-badge">
  <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-4ECDC4?style=for-the-badge">
  <img src="https://img.shields.io/badge/license-MIT-FFE66D?style=for-the-badge">
</p>

<p align="center">
  <i>"Free as a bird, beautiful as cherry blossoms"</i><br>
  <i>「鳥のように自由に、桜のように美しく」</i>
</p>

---

## 📋 Daftar Isi
- [Fitur](#-fitur)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Penggunaan](#-penggunaan)
- [Daftar Perintah](#-daftar-perintah)
- [Membuat Plugin](#-membuat-plugin)
- [Struktur Folder](#-struktur-folder)
- [API Keys](#-api-keys)

---

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 🧩 **Sistem Plugin** | Tambah/hapus fitur dengan mudah |
| ⌨️ **Inline Keyboard** | Navigasi tombol interaktif |
| 🎌 **Tema Jepang** | UI aesthetic dengan emoji Jepang |
| 🖼️ **Auto Gambar** | Setiap pesan pakai gambar banner |
| ⚡ **Real-time** | Respon cepat dengan status system |
| 🔌 **Multi-API** | Siap integrasi berbagai API |

---

## 🚀 Instalasi

### 1. Clone Repository
```bash
git clone https://github.com/username/kanaeku-tori-bot.git
cd kanaeku-tori-bot
```

2. Install Dependencies

```bash
npm install
```

3. Siapkan Gambar
- Download gambar tema Jepang (sakura/torii gate/bird)
- Simpan di folder `assets/` dengan nama `tori_banner.jpg`

4. Konfigurasi

```bash
# Edit file config/config.js
# Masukkan token bot dari @BotFather
```

5. Jalankan Bot

```bash
# Mode Production
npm start

# Mode Development (auto-restart)
npm run dev
```

---

⚙️ Konfigurasi

Edit file `config/config.js`:

```javascript
module.exports = {
    telegram: {
        botToken: 'MASUKKAN_TOKEN_BOT_DISINI',  // WAJIB
        username: 'KanaekuToriBot',
        ownerId: 'ID_TELEGRAM_KAMU'  // Untuk perintah admin
    },
    
    // Optional - untuk fitur tambahan
    weather: {
        apiKey: 'OPENWEATHER_API_KEY'  // Dari openweathermap.org
    }
};
```

Dapatkan Token Bot:
1. Buka Telegram, cari @BotFather
2. Kirim `/newbot`
3. Ikuti instruksi, simpan token yang diberikan

---

🎮 Penggunaan

Setelah bot jalan, kirim perintah di Telegram:

```
/start        → Menu utama dengan tombol interaktif
/help         → Daftar semua perintah
/ping         → Cek kecepatan bot
/status       → Info sistem
```

---

📜 Daftar Perintah

🎯 Perintah Dasar

Perintah	Fungsi	
`/start`	Mulai bot, tampilkan menu utama	
`/help`	Bantuan lengkap	
`/ping`	Cek latency (kecepatan)	
`/status`	Status sistem & penggunaan resource	

🎮 Perintah Fun

Perintah	Fungsi	Contoh	
`/animequote`	Quote anime random	`/animequote`	
`/waifu`	Gambar waifu random	`/waifu maid`	
`/jankenpon`	Main batu-gunting-kertas	`/jankenpon batu`	

Tag Waifu: `maid`, `waifu`, `marin-kitagawa`, `mori-calliope`, `raiden-shogun`, `oppai`, `selfies`, `uniform`

🛠️ Perintah Utility

Perintah	Fungsi	Contoh	
`/weather`	Info cuaca	`/weather Tokyo`	
`/translate`	Terjemahkan teks	`/translate ja Hello`	

Kode Bahasa: `id` (Indonesia), `en` (English), `ja` (Jepang), `ko` (Korea), `zh` (Cina), dll.

👑 Perintah Admin

Perintah	Fungsi	Catatan	
`/broadcast`	Kirim pesan ke semua user	Hanya untuk owner	

---

🧩 Membuat Plugin

Langkah 1: Buat File
Buat file di `plugins/[kategori]/namaplugin.js`

Langkah 2: Template Dasar

```javascript
class NamaPlugin {
    constructor() {
        this.name = 'namaplugin';
        this.description = 'Deskripsi singkat';
    }

    get commands() {
        return {
            namacommand: {
                description: 'Deskripsi perintah',
                execute: async (ctx) => {
                    const { bot, chatId, banner } = ctx;
                    
                    await bot.sendPhoto(chatId, banner, {
                        caption: 'Halo dari plugin baru!',
                        parse_mode: 'HTML'
                    });
                }
            }
        };
    }
}

module.exports = NamaPlugin;
```

Langkah 3: Restart Bot
Plugin otomatis terdeteksi saat restart!

---

📁 Struktur Folder

```
kanaeku-tori-bot/
├── 📁 assets/
│   └── tori_banner.jpg          # Gambar utama bot
├── 📁 config/
│   └── config.js                # Konfigurasi & API keys
├── 📁 core/
│   ├── loader.js                # Plugin loader (jangan diubah)
│   └── utils.js                 # Fungsi bantu (jangan diubah)
├── 📁 plugins/                  # ← TAMBAH PLUGIN DI SINI
│   ├── 📁 core/                 # Plugin bawaan
│   ├── 📁 fun/                  # Plugin hiburan
│   ├── 📁 utility/              # Plugin utilitas
│   └── 📁 admin/                # Plugin admin
├── 📁 database/
│   └── users.json               # Data pengguna
├── main.js                      # File utama (jangan diubah)
├── requirements.js              # Dependencies info
└── package.json
```

---

🔑 API Keys (Optional)

Fitur ini butuh API key:

Fitur	API Provider	Link	Gratis?	
Cuaca	OpenWeatherMap	[openweathermap.org](https://openweathermap.org/api)	✅ Yes	
Waifu	Waifu.im	[waifu.im](https://waifu.im)	✅ Yes	
Translate	Google Cloud	[cloud.google.com/translate](https://cloud.google.com/translate)	⚠️ Free tier	

Cara menambah API key:
1. Daftar di website provider
2. Copy API key yang diberikan
3. Paste di `config/config.js`
4. Restart bot

---

🎨 Kustomisasi

Ganti Tema Warna
Edit di `requirements.js`:

```javascript
theme: {
    primary: '#FF6B9D',    // Sakura Pink
    secondary: '#4ECDC4',  // Torii Teal
    accent: '#FFE66D',     // Gold
    dark: '#2C3E50'        // Midnight
}
```

Ganti Gambar Banner
Ganti file `assets/tori_banner.jpg` dengan gambar favoritmu (rekomendasi: 1280x720px)

---

🐛 Troubleshooting

Masalah	Solusi	
`Error: Cannot find module`	Jalankan `npm install`	
`ETELEGRAM: 401 Unauthorized`	Token bot salah, cek di @BotFather	
Gambar tidak terkirim	Pastikan file `tori_banner.jpg` ada di folder `assets/`	
Command tidak response	Cek log error di terminal	

---

🤝 Kontribusi

1. Fork repository ini
2. Buat branch baru (`git checkout -b feature-nama`)
3. Commit perubahan (`git commit -m 'Add fitur baru'`)
4. Push ke branch (`git push origin feature-nama`)
5. Buat Pull Request

---

📄 Lisensi

MIT License - Bebas digunakan dan dimodifikasi!

---

---

Tips Penggunaan:
1. Copy seluruh kode di atas
2. Simpan sebagai `README.md` di root folder project
3. Ganti `username` di link repository dengan username GitHub-mu
4. Tambahkan screenshot bot setelah jalan untuk membuat README lebih menarik! 🌸