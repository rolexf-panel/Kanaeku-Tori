# 🤝 Contributing Guide

Terima kasih atas minat Anda untuk berkontribusi pada Kanaeku Tori Bot!

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Plugin Development](#plugin-development)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)

## 🚀 Getting Started

1. Fork repository ini
2. Clone fork Anda
```bash
git clone https://github.com/your-username/kanaeku-tori-bot.git
cd kanaeku-tori-bot
```

3. Install dependencies
```bash
npm install
```

4. Buat branch baru untuk fitur Anda
```bash
git checkout -b feature/nama-fitur-anda
```

## 🔌 Plugin Development

### Struktur Plugin

Semua plugin harus mengikuti struktur standar:

```javascript
module.exports = {
    name: 'commandname',        // Required: Command name
    aliases: ['alias1'],         // Optional: Command aliases
    category: 'categoryname',    // Optional: Plugin category
    description: 'Description',  // Required: Short description
    usage: 'Usage example',      // Optional: Usage example
    
    async execute(bot, msg, args) {
        // Required: Main command logic
    },
    
    async handleCallback(bot, query) {
        // Optional: Callback handler for inline keyboards
    }
};
```

### Kategori Plugin

Gunakan kategori yang sesuai:

- `general` - Perintah umum
- `utility` - Utilitas dan tools
- `fun` - Hiburan dan games
- `admin` - Perintah admin
- `moderation` - Moderasi grup
- `info` - Informasi dan statistik

### Naming Convention

- **File name**: lowercase dengan underscore `my_plugin.js`
- **Command name**: lowercase tanpa spasi `mycommand`
- **Aliases**: singkat dan mudah diingat
- **Variables**: camelCase
- **Functions**: camelCase

## 📝 Code Style

### JavaScript Style

```javascript
// Good ✅
const userName = msg.from.first_name;
async function handleCommand(bot, msg) {
    const chatId = msg.chat.id;
    // ...
}

// Bad ❌
const user_name = msg.from.first_name;
function handleCommand(bot,msg){
const chatId=msg.chat.id;
}
```

### Error Handling

Selalu gunakan try-catch:

```javascript
async execute(bot, msg, args) {
    try {
        const chatId = msg.chat.id;
        // Your logic here
        
    } catch (error) {
        console.error('Error in mycommand:', error);
        await bot.sendMessage(msg.chat.id, '❌ Terjadi kesalahan!');
    }
}
```

### Callback Handling

Selalu answer callback query:

```javascript
async handleCallback(bot, query) {
    try {
        // Your logic here
        
        // Always answer the callback
        await bot.answerCallbackQuery(query.id, {
            text: 'Action completed',
            show_alert: false
        });
        
    } catch (error) {
        await bot.answerCallbackQuery(query.id, {
            text: '❌ Error',
            show_alert: true
        });
    }
}
```

### Message Formatting

Gunakan template strings untuk pesan panjang:

```javascript
const message = `
*Title Here*

Content line 1
Content line 2

_Footer text_
`.trim();

await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
```

## 🧪 Testing

Sebelum submit PR, pastikan:

1. **Plugin berfungsi dengan baik**
```bash
# Jalankan bot
npm start

# Test command Anda
.yourcommand
```

2. **Tidak ada error di console**
3. **Callback query berfungsi** (jika ada)
4. **Hot reload berfungsi**
```bash
.reload
```

### Checklist Testing

- [ ] Command dapat dipanggil dengan semua prefix (`.`, `/`, `liona`)
- [ ] Aliases berfungsi
- [ ] Error handling bekerja
- [ ] Inline keyboard berfungsi (jika ada)
- [ ] Callback query berfungsi (jika ada)
- [ ] Tidak ada memory leak
- [ ] Pesan error informatif

## 🔄 Pull Request Process

1. **Update README** jika menambah fitur baru
2. **Test plugin Anda** secara menyeluruh
3. **Commit dengan pesan yang jelas**
```bash
git commit -m "feat: add weather check plugin"
```

4. **Push ke branch Anda**
```bash
git push origin feature/nama-fitur-anda
```

5. **Buat Pull Request** dengan deskripsi:
   - Apa yang ditambahkan/diubah
   - Mengapa perubahan diperlukan
   - Screenshot (jika UI changes)
   - Testing yang sudah dilakukan

### Commit Message Convention

```
feat: menambah fitur baru
fix: memperbaiki bug
docs: update dokumentasi
style: format code tanpa mengubah logic
refactor: refactor code
test: menambah testing
chore: update dependencies
```

## 📚 Documentation

Jika menambah plugin baru, update:

1. **README.md** - Tambahkan di daftar commands
2. **Plugin file** - Tambahkan komentar yang jelas
3. **Usage example** - Berikan contoh penggunaan

## ❓ Questions?

Jika ada pertanyaan:

1. Baca dokumentasi terlebih dahulu
2. Cek existing plugins sebagai referensi
3. Buka issue untuk diskusi
4. Hubungi maintainer

## 🙏 Thank You!

Terima kasih telah berkontribusi untuk membuat Kanaeku Tori Bot lebih baik!

---

Happy Coding! 🦅
