# 🔧 Setup Guide - Environment Configuration

Panduan lengkap untuk mengkonfigurasi bot Anda.

## 📋 Prerequisites

- Akun Telegram
- Node.js 14+ terinstall
- Text editor (VS Code, Notepad++, dll)

## 🚀 Quick Setup (3 Steps)

### Step 1: Copy Environment File

```bash
# Pilih salah satu:

# Option A: Simple template (recommended untuk pemula)
cp .env.template .env

# Option B: Full template (untuk konfigurasi advanced)
cp .env.example .env
```

### Step 2: Get Bot Token

1. **Buka Telegram** dan cari **@BotFather**
2. **Start chat** dengan mengirim `/start`
3. **Create new bot** dengan mengirim `/newbot`
4. **Masukkan nama bot** (contoh: "My Awesome Bot")
5. **Masukkan username bot** (harus diakhiri dengan 'bot', contoh: "my_awesome_bot")
6. **Copy token** yang diberikan BotFather

```
Example token:
1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-1234567
```

7. **Paste token** ke file `.env`:

```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-1234567
```

### Step 3: Get Your User ID

1. **Buka Telegram** dan cari **@userinfobot**
2. **Start chat** dengan mengirim `/start`
3. Bot akan memberikan informasi tentang akun Anda
4. **Copy ID** Anda (angka yang ada di `Id:`)

```
Example response:
Id: 123456789
```

5. **Paste ID** ke file `.env`:

```env
ADMIN_ID=123456789
```

## ✅ Final Configuration

File `.env` Anda seharusnya terlihat seperti ini:

```env
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz-1234567
ADMIN_ID=123456789
BOT_NAME=Kanaeku Tori
```

## 🎯 Verify Setup

Run bot untuk memverifikasi:

```bash
npm start
```

Jika berhasil, Anda akan melihat:

```
✅ Bot is ready!
[SUCCESS] Bot is now running as @your_bot_name
```

## 📱 Test Your Bot

1. Cari bot Anda di Telegram menggunakan username yang Anda buat
2. Kirim `/start`
3. Bot akan merespon dengan welcome message!

## 🔐 Security Tips

### ⚠️ NEVER share your bot token!
- Don't commit `.env` to Git (already in `.gitignore`)
- Don't share token in public channels
- Don't post screenshots containing token
- Regenerate token if leaked (via @BotFather → `/token`)

### 🛡️ Protecting Your Token

```bash
# Make sure .env is in .gitignore
echo ".env" >> .gitignore

# Check if .env is ignored
git status
# .env should NOT appear in untracked files
```

## ⚙️ Advanced Configuration

### Multiple Admins

Edit `.env`:

```env
# Single admin
ADMIN_ID=123456789

# Or use comma-separated for multiple admins
ADMIN_IDS=123456789,987654321,555555555
```

Then update `src/main.js` to support multiple admins:

```javascript
const adminIds = process.env.ADMIN_IDS 
    ? process.env.ADMIN_IDS.split(',').map(id => parseInt(id))
    : [parseInt(process.env.ADMIN_ID)];

// Check admin
const isAdmin = adminIds.includes(userId);
```

### Enable Logging

```env
LOG_TO_FILE=true
DEBUG=true
```

Logs will be saved to `data/bot.log`

### Database Configuration

#### MySQL/MariaDB

```env
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=kanaeku_bot
```

Then install MySQL package:

```bash
npm install mysql2
```

#### MongoDB

```env
DB_TYPE=mongodb
MONGO_URI=mongodb://localhost:27017/kanaeku_bot
```

Then install MongoDB package:

```bash
npm install mongodb
```

#### SQLite

```env
DB_TYPE=sqlite
SQLITE_PATH=./data/bot.db
```

Then install SQLite package:

```bash
npm install sqlite3
```

### API Keys

Add API keys for external services:

```env
# Weather
OPENWEATHER_API_KEY=your_key_here

# News
NEWS_API_KEY=your_key_here

# YouTube
YOUTUBE_API_KEY=your_key_here
```

### Feature Flags

Enable/disable features:

```env
ENABLE_STATS=true
ENABLE_QUOTES=true
ENABLE_GAMES=false

# Disable specific plugins
DISABLED_PLUGINS=quote,dice
```

## 🐛 Troubleshooting

### Error: "BOT_TOKEN is not defined"

**Problem:** File `.env` tidak ditemukan atau nama file salah

**Solution:**
```bash
# Check if .env exists
ls -la | grep .env

# If not, create it
cp .env.template .env

# Then edit and add your token
```

### Error: "Unauthorized" atau "401"

**Problem:** Bot token salah atau tidak valid

**Solution:**
1. Check token di file `.env`
2. Pastikan tidak ada spasi atau karakter tambahan
3. Generate token baru dari @BotFather jika perlu

### Bot tidak merespon

**Problem:** Bot tidak running atau token salah

**Solution:**
```bash
# Stop bot (Ctrl+C)
# Check .env configuration
# Restart bot
npm start
```

### Error: "Cannot find module"

**Problem:** Dependencies belum terinstall

**Solution:**
```bash
npm install
```

## 📚 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `BOT_TOKEN` | Telegram Bot Token | `1234567890:ABC...` |
| `ADMIN_ID` | Your Telegram User ID | `123456789` |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BOT_NAME` | `Kanaeku Tori` | Bot display name |
| `BOT_VERSION` | `1.0.0` | Bot version |
| `LOG_TO_FILE` | `false` | Enable file logging |
| `DEBUG` | `false` | Enable debug mode |
| `DB_TYPE` | `none` | Database type |

## 🆘 Need Help?

### Getting Bot Token
- Visit: https://core.telegram.org/bots#6-botfather
- Chat with: [@BotFather](https://t.me/botfather)

### Getting User ID
- Chat with: [@userinfobot](https://t.me/userinfobot)
- Alternative: [@myidbot](https://t.me/myidbot)

### Documentation
- Read: [README.md](README.md)
- Quick Start: [QUICKSTART.md](QUICKSTART.md)
- API Reference: [API.md](API.md)

## ✨ Ready to Go!

Setelah konfigurasi selesai:

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start
```

Buka bot Anda di Telegram dan kirim `/start` untuk memulai!

---

**Happy Coding!** 🦅

*Need more help? Check the documentation or open an issue.*
