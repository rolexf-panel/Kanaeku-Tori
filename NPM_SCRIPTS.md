# 📜 NPM Scripts Documentation

Dokumentasi lengkap semua npm commands yang tersedia di Kanaeku Tori Bot.

## 🚀 Basic Commands

### `npm start`
**Production Mode** - Menjalankan bot dalam mode production.

```bash
npm start
```

**Kapan digunakan:**
- Menjalankan bot di server production
- Deploy ke VPS/hosting
- Running bot secara normal

**Output:**
```
╔═══════════════════════════════════════════════════════════╗
║    🦅 KANAEKU TORI - Telegram Bot Framework 🦅           ║
╚═══════════════════════════════════════════════════════════╝

✅ Bot is ready!
[SUCCESS] Bot is now running as @your_bot_name
```

---

### `npm run dev`
**Development Mode** - Menjalankan bot dengan auto-reload menggunakan nodemon.

```bash
npm run dev
```

**Kapan digunakan:**
- Saat development/coding
- Testing plugin baru
- Debugging

**Fitur:**
- ✅ Auto-reload saat file berubah
- ✅ Watch semua folder penting (src, plugins, lib)
- ✅ Delay 1 detik untuk stability
- ✅ Ignore folder node_modules dan data

**Output:**
```
[nodemon] 3.0.1
[nodemon] watching: src plugins lib index.js
[nodemon] starting `node index.js`
... (startup animation)
✅ Bot is ready!
```

---

## 🔧 Setup Commands

### `npm run setup`
**Auto Setup** - Instalasi dependencies dan membuat file .env otomatis.

```bash
npm run setup
```

**Yang dilakukan:**
1. ✅ Install semua dependencies
2. ✅ Copy .env.template ke .env
3. ✅ Memberitahu untuk edit .env

**Output:**
```
✅ Setup complete! Edit .env file and run 'npm start'
```

**Langkah selanjutnya:**
1. Edit file `.env`
2. Tambahkan `BOT_TOKEN` dan `ADMIN_ID`
3. Run `npm start`

---

## ✅ Validation Commands

### `npm run check`
**Configuration Check** - Memvalidasi konfigurasi environment.

```bash
npm run check
```

**Yang dicek:**
- ✅ File .env ada atau tidak
- ✅ BOT_TOKEN sudah diisi atau belum
- ✅ Format environment variable benar

**Output jika OK:**
```
✅ Configuration OK
```

**Output jika error:**
```
❌ BOT_TOKEN not found in .env
```

---

### `npm run info`
**Bot Information** - Menampilkan informasi tentang bot.

```bash
npm run info
```

**Output:**
```
📦 kanaeku-tori-bot v1.0.0
📝 Pluggable Telegram Bot with modular architecture
```

---

## 🧹 Maintenance Commands

### `npm run clean`
**Clean Installation** - Menghapus node_modules dan package-lock.json.

```bash
npm run clean
```

**Kapan digunakan:**
- Saat ada masalah dengan dependencies
- Sebelum fresh install
- Cleaning up project

**Output:**
```
(removes node_modules and package-lock.json)
```

---

### `npm run reinstall`
**Fresh Install** - Clean install dependencies dari awal.

```bash
npm run reinstall
```

**Yang dilakukan:**
1. ✅ Hapus node_modules
2. ✅ Hapus package-lock.json
3. ✅ Install ulang semua dependencies

**Kapan digunakan:**
- Troubleshooting dependency issues
- After updating package.json
- Fixing corrupted installations

---

### `npm test`
**Run Tests** - Menjalankan test suite (placeholder).

```bash
npm test
```

**Note:** Saat ini belum ada test yang dikonfigurasi. Akan menampilkan:
```
No tests configured yet
```

---

## 📦 Package Management

### `npm install`
**Install Dependencies** - Install semua dependencies yang diperlukan.

```bash
npm install
```

**Dependencies yang terinstall:**
- `node-telegram-bot-api` - Telegram Bot API wrapper
- `axios` - HTTP client untuk API calls
- `dotenv` - Environment variables loader

**Dev Dependencies:**
- `nodemon` - Auto-reload untuk development

---

### `npm update`
**Update Dependencies** - Update semua dependencies ke versi terbaru.

```bash
npm update
```

**Kapan digunakan:**
- Update security patches
- Get latest features
- Quarterly maintenance

---

### `npm outdated`
**Check Outdated Packages** - Cek package yang outdated.

```bash
npm outdated
```

**Output:**
```
Package                    Current  Wanted  Latest
node-telegram-bot-api      0.64.0   0.64.0  0.65.0
axios                      1.6.0    1.6.2   1.6.2
```

---

## 🔍 Useful Commands

### Install Specific Package

```bash
# Production dependency
npm install package-name

# Dev dependency
npm install --save-dev package-name

# Global package
npm install -g package-name
```

### Uninstall Package

```bash
npm uninstall package-name
```

### List Installed Packages

```bash
npm list
# atau untuk top-level saja
npm list --depth=0
```

---

## 🎯 Complete Workflow Examples

### First Time Setup

```bash
# 1. Clone/download project
cd kanaeku-tori-bot

# 2. Auto setup
npm run setup

# 3. Edit .env file
nano .env
# (Add BOT_TOKEN and ADMIN_ID)

# 4. Check configuration
npm run check

# 5. Start bot
npm start
```

---

### Development Workflow

```bash
# 1. Start in dev mode
npm run dev

# 2. Edit plugins (auto-reload akan bekerja)
# ... make changes to plugins/myfeature.js

# 3. Test in Telegram
# ... bot akan restart otomatis

# 4. When done, stop (Ctrl+C)
```

---

### Production Deployment

```bash
# 1. Check configuration
npm run check

# 2. Test locally first
npm start

# 3. Stop (Ctrl+C)

# 4. Deploy to server
# ... upload files to server

# 5. Run in production
npm start

# Optional: Run with PM2 for auto-restart
npm install -g pm2
pm2 start index.js --name "kanaeku-bot"
```

---

### Troubleshooting Workflow

```bash
# 1. Check bot info
npm run info

# 2. Check configuration
npm run check

# 3. If dependency issues
npm run reinstall

# 4. Check configuration again
npm run check

# 5. Try starting
npm start
```

---

## 🚨 Common Issues & Solutions

### Issue: "Cannot find module"

```bash
# Solution: Reinstall dependencies
npm run reinstall
```

### Issue: "BOT_TOKEN is not defined"

```bash
# Solution 1: Check if .env exists
ls -la | grep .env

# Solution 2: Create from template
cp .env.template .env

# Solution 3: Verify configuration
npm run check
```

### Issue: "Port already in use"

```bash
# Solution: Kill existing process
# On Linux/Mac:
pkill -f "node index.js"

# On Windows:
# Find and kill node process in Task Manager
```

### Issue: "Permission denied"

```bash
# Solution: Fix permissions
chmod +x index.js

# Or run with sudo (not recommended)
sudo npm start
```

---

## 🎓 Tips & Best Practices

### Development Tips

1. **Always use dev mode saat development:**
   ```bash
   npm run dev
   ```

2. **Check configuration sebelum deploy:**
   ```bash
   npm run check
   ```

3. **Clean install jika ada masalah:**
   ```bash
   npm run reinstall
   ```

### Production Tips

1. **Use process manager like PM2:**
   ```bash
   pm2 start npm --name "kanaeku-bot" -- start
   ```

2. **Enable logging:**
   ```env
   LOG_TO_FILE=true
   ```

3. **Monitor bot performance:**
   ```bash
   pm2 monit
   ```

---

## 📚 Additional Resources

- **Package.json Documentation:** https://docs.npmjs.com/cli/v8/configuring-npm/package-json
- **NPM Scripts:** https://docs.npmjs.com/cli/v8/using-npm/scripts
- **Nodemon:** https://nodemon.io/

---

## 🆘 Need Help?

Jika masih ada masalah:

1. ✅ Baca dokumentasi
2. ✅ Check GitHub issues
3. ✅ Run `npm run check`
4. ✅ Try `npm run reinstall`
5. ✅ Contact support

---

**Happy Developing!** 🦅
