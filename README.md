<<<<<<< HEAD
# 🦅 Kanaeku Tori - Pluggable Telegram Bot

Sebuah framework Telegram Bot yang modular dan dapat dikustomisasi, dibangun dengan Node.js dan arsitektur plugin.

## ✨ Fitur Utama

- 🔌 **Arsitektur Modular**: Sistem plugin yang mudah untuk menambah fitur baru
- 🔥 **Hot Reload**: Muat ulang plugin tanpa restart bot
- 🎮 **Interactive Callbacks**: Mendukung inline keyboard dan callback queries
- 🎨 **Multiple Prefixes**: Mendukung `.`, `/`, dan keyword `liona`
- 📊 **Built-in Commands**: Menu, help, info, ping, dan lebih banyak lagi
- 🛡️ **Admin System**: Perintah khusus admin dengan authorization
- 🎯 **Easy to Extend**: Tambahkan fitur baru hanya dengan membuat file plugin

## 📁 Struktur Project

```
kanaeku-tori-bot/
├── index.js              # Launcher dengan startup animation
├── src/
│   └── main.js          # Core system (command loader & router)
├── plugins/             # Folder untuk semua plugin
│   ├── start.js         # Welcome message
│   ├── menu.js          # Interactive menu
│   ├── help.js          # Help system
│   ├── info.js          # Bot information
│   ├── ping.js          # Latency checker
│   ├── reload.js        # Hot reload (admin only)
│   ├── echo.js          # Echo utility
│   └── calc.js          # Calculator
├── lib/                 # Utility libraries
│   ├── database.js      # Database utility (placeholder)
│   └── logger.js        # Logging utility
├── data/                # Data storage (logs, cache, etc)
├── .env                 # Environment variables (create from .env.example)
└── package.json         # Dependencies
```

## 🚀 Quick Start

### 1. Installation

```bash
# Clone atau download project ini
cd kanaeku-tori-bot

# Install dependencies
npm install

# Copy dan edit environment variables
cp .env.example .env
nano .env  # Tambahkan BOT_TOKEN Anda
```

### 2. Konfigurasi

Edit file `.env`:

```env
BOT_TOKEN=your_bot_token_from_botfather
BOT_NAME=Kanaeku Tori
ADMIN_ID=your_telegram_user_id
```

Dapatkan bot token dari [@BotFather](https://t.me/botfather) di Telegram.

### 3. Menjalankan Bot

```bash
# Production mode
npm start

# Development mode (dengan auto-reload)
npm run dev
```

## 🎯 Cara Menggunakan Bot

Bot mendukung tiga jenis prefix:

```
.command [args]
/command [args]
liona command [args]
```

### Contoh:

```
.menu
/help ping
liona info
```

## 🔌 Membuat Plugin Baru

### Template Plugin Dasar

Buat file baru di folder `plugins/`, misalnya `myfeature.js`:

```javascript
module.exports = {
    name: 'myfeature',
    aliases: ['mf', 'feature'],
    category: 'utility',
    description: 'Deskripsi fitur Anda',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        // Logic Anda di sini
        await bot.sendMessage(chatId, 'Halo dari plugin baru!');
    },
    
    // Optional: Handler untuk tombol interaktif
    async handleCallback(bot, query) {
        const data = query.data; // Format: myfeature:action:params
        const parts = data.split(':');
        const action = parts[1];
        
        if (action === 'button1') {
            await bot.answerCallbackQuery(query.id, {
                text: 'Button clicked!',
                show_alert: false
            });
        }
    }
};
```

### Template Plugin dengan Inline Keyboard

```javascript
module.exports = {
    name: 'interactive',
    aliases: ['int'],
    category: 'utility',
    description: 'Plugin interaktif dengan tombol',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        const options = {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Option 1', callback_data: 'interactive:opt1' },
                        { text: '❌ Option 2', callback_data: 'interactive:opt2' }
                    ],
                    [
                        { text: '🔙 Back', callback_data: 'menu:show' }
                    ]
                ]
            }
        };
        
        await bot.sendMessage(chatId, 'Pilih opsi:', options);
    },
    
    async handleCallback(bot, query) {
        const parts = query.data.split(':');
        const action = parts[1];
        
        if (action === 'opt1') {
            await bot.answerCallbackQuery(query.id, {
                text: 'Anda memilih Option 1',
                show_alert: true
            });
        } else if (action === 'opt2') {
            await bot.editMessageText('Option 2 dipilih!', {
                chat_id: query.message.chat.id,
                message_id: query.message.message_id
            });
            await bot.answerCallbackQuery(query.id);
        }
    }
};
```

## 📚 Plugin Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | String | ✅ | Nama command utama |
| `aliases` | Array | ❌ | Alias untuk command |
| `category` | String | ❌ | Kategori (default: 'general') |
| `description` | String | ✅ | Deskripsi singkat |
| `usage` | String | ❌ | Contoh penggunaan |
| `execute` | Function | ✅ | Handler untuk command |
| `handleCallback` | Function | ❌ | Handler untuk callback query |

## 🎨 Built-in Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `.start` | `mulai`, `begin` | Welcome message |
| `.menu` | `m`, `commands` | Interactive menu |
| `.help` | `h`, `bantuan` | Help system |
| `.info` | `about`, `botinfo` | Bot information |
| `.ping` | `p`, `latency` | Check latency |
| `.reload` | `r`, `refresh` | Reload plugins (admin) |
| `.echo` | `say`, `repeat` | Echo message |
| `.calc` | `calculator`, `hitung` | Calculator |

## 🛠️ Advanced Features

### Hot Reload

Untuk memuat ulang plugin tanpa restart:

```
.reload
```

*Note: Hanya admin yang dapat menggunakan command ini*

### Accessing Bot Instance

Dalam plugin, Anda dapat mengakses:

```javascript
const { bot, commands, aliases, categories, config } = require('../src/main');
```

### Logging

Gunakan logger utility:

```javascript
const logger = require('../lib/logger');

logger.info('Informasi');
logger.success('Berhasil');
logger.warn('Peringatan');
logger.error('Error', errorObject);
logger.debug('Debug info');
logger.command(username, commandName, args);
```

### Database (Optional)

Template untuk database sudah tersedia di `lib/database.js`. Anda dapat mengimplementasikan:

- MySQL/MariaDB
- PostgreSQL
- MongoDB
- SQLite

## 🔒 Security

- Command admin dilindungi dengan cek `ADMIN_ID`
- Callback queries divalidasi sebelum dieksekusi
- Error handling untuk mencegah crash
- Input sanitization pada calculator

## 📦 Dependencies

- `node-telegram-bot-api` - Telegram Bot API wrapper
- `dotenv` - Environment variable manager
- `axios` - HTTP client (optional, untuk API calls)

## 🤝 Contributing

Untuk menambahkan fitur baru:

1. Buat plugin baru di folder `plugins/`
2. Ikuti template plugin yang ada
3. Test plugin Anda
4. Gunakan `.reload` untuk memuat ulang

## 📄 License

MIT License - Silakan gunakan dan modifikasi sesuai kebutuhan.

## 🐛 Troubleshooting

### Bot tidak merespon

- Pastikan `BOT_TOKEN` sudah benar di `.env`
- Cek koneksi internet
- Lihat console untuk error messages

### Plugin tidak terbaca

- Pastikan file ada di folder `plugins/`
- Cek struktur `module.exports`
- Gunakan `.reload` untuk memuat ulang
- Lihat console untuk error saat loading

### Callback tidak bekerja

- Pastikan `callback_data` format: `pluginName:action:params`
- Implementasikan `handleCallback` function
- Jangan lupa `answerCallbackQuery` untuk menghilangkan loading state

## 💡 Tips

1. **Gunakan aliases** untuk command yang sering dipakai
2. **Buat kategori yang jelas** untuk organisasi yang baik
3. **Tambahkan deskripsi lengkap** agar user mudah memahami
4. **Handle error dengan baik** untuk mencegah crash
5. **Gunakan inline keyboard** untuk UX yang lebih baik

## 📞 Support

Jika menemukan bug atau punya pertanyaan, silakan buat issue atau hubungi developer.

---

**Dibuat dengan ❤️ menggunakan Node.js dan node-telegram-bot-api**
=======
p
>>>>>>> 037beeaed83c2f462959bdac1ad7d7d45b61234c
