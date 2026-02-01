# 🚀 Quick Start Guide

Panduan cepat untuk menjalankan Kanaeku Tori Bot dalam 5 menit!

## ⚡ Quick Setup (3 Steps)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Setup Environment

```bash
# Copy file .env.example
cp .env.example .env

# Edit .env dan isi BOT_TOKEN Anda
nano .env
```

Isi dengan:
```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
ADMIN_ID=your_telegram_id
```

**Cara mendapatkan Bot Token:**
1. Buka [@BotFather](https://t.me/botfather) di Telegram
2. Kirim `/newbot`
3. Ikuti instruksi
4. Copy token yang diberikan

**Cara mendapatkan User ID:**
1. Buka [@userinfobot](https://t.me/userinfobot)
2. Kirim `/start`
3. Copy ID Anda

### 3️⃣ Run Bot

```bash
npm start
```

Selesai! Bot Anda sekarang online! 🎉

## 💬 Test Bot

Buka bot Anda di Telegram dan coba:

```
/start
.menu
.help
.ping
```

## 📝 Basic Commands

| Command | Description |
|---------|-------------|
| `.start` | Mulai bot |
| `.menu` | Lihat semua fitur |
| `.help` | Panduan bantuan |
| `.ping` | Cek kecepatan |
| `.info` | Info bot |

## 🔧 Development Mode

Untuk development dengan auto-reload:

```bash
npm run dev
```

## 🎨 Customize Bot

### Menambah Plugin Baru

1. Copy `plugins/_template.js`
2. Rename dan edit sesuai kebutuhan
3. Reload plugin dengan `.reload`

### Mengubah Prefix

Edit di `src/main.js`:

```javascript
const config = {
    prefix: ['.', '/', 'liona'],  // Tambah/kurangi prefix
    // ...
}
```

## 🐛 Troubleshooting

### Bot tidak merespon?

1. Cek `BOT_TOKEN` di file `.env`
2. Pastikan bot sudah di-start dengan `/start`
3. Lihat console untuk error

### Command tidak terbaca?

1. Pastikan menggunakan prefix yang benar
2. Coba `.reload` untuk reload plugin
3. Cek console untuk error loading plugin

### Plugin baru tidak muncul?

1. Pastikan file ada di folder `plugins/`
2. Cek struktur `module.exports`
3. Gunakan `.reload`

## 📚 Next Steps

- Baca [README.md](README.md) untuk dokumentasi lengkap
- Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan development
- Explore plugins di folder `plugins/` sebagai contoh
- Buat plugin Anda sendiri!

## 💡 Tips

1. **Gunakan `.reload`** setelah edit plugin
2. **Check console** untuk melihat log dan error
3. **Backup `.env`** Anda (jangan commit ke git!)
4. **Test di private chat** dulu sebelum deploy

## 🆘 Need Help?

- Baca dokumentasi
- Cek existing plugins sebagai contoh
- Open issue di repository
- Join community (jika ada)

---

Happy Coding! 🦅

**Next:** Lihat [README.md](README.md) untuk panduan lengkap
