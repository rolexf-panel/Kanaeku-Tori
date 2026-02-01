# 📖 API Reference

Dokumentasi lengkap untuk menggunakan API bot dan membuat plugin.

## 🔧 Plugin Structure

### Basic Plugin

```javascript
module.exports = {
    name: String,           // Required: Command name
    aliases: Array,         // Optional: Alternative names
    category: String,       // Optional: Category name
    description: String,    // Required: Short description
    usage: String,          // Optional: Usage example
    execute: Function,      // Required: Main handler
    handleCallback: Function // Optional: Callback handler
};
```

## 📦 Available Objects

### Bot Object

Tersedia di parameter `execute()` dan `handleCallback()`:

```javascript
bot.sendMessage(chatId, text, options)
bot.editMessageText(text, options)
bot.deleteMessage(chatId, messageId)
bot.answerCallbackQuery(queryId, options)
bot.sendPhoto(chatId, photo, options)
bot.sendDocument(chatId, document, options)
bot.sendVideo(chatId, video, options)
bot.sendAudio(chatId, audio, options)
bot.sendSticker(chatId, sticker)
bot.sendDice(chatId, options)
```

### Message Object

Parameter `msg` di `execute()`:

```javascript
{
    message_id: Number,
    from: {
        id: Number,
        is_bot: Boolean,
        first_name: String,
        username: String,
        language_code: String
    },
    chat: {
        id: Number,
        type: String,  // 'private', 'group', 'supergroup'
        title: String,
        username: String
    },
    date: Number,
    text: String
}
```

### Query Object

Parameter `query` di `handleCallback()`:

```javascript
{
    id: String,
    from: Object,  // Same as msg.from
    message: Object,  // Same as msg
    chat_instance: String,
    data: String  // callback_data yang dikirim
}
```

## 🎨 Formatting Options

### Markdown

```javascript
await bot.sendMessage(chatId, text, {
    parse_mode: 'Markdown'
});
```

**Supported formats:**
- `*bold*` → **bold**
- `_italic_` → _italic_
- `[text](URL)` → [text](URL)
- `` `code` `` → `code`
- ` ```code block``` ` → code block

### HTML

```javascript
await bot.sendMessage(chatId, text, {
    parse_mode: 'HTML'
});
```

**Supported tags:**
- `<b>bold</b>`
- `<i>italic</i>`
- `<code>code</code>`
- `<pre>code block</pre>`
- `<a href="URL">text</a>`

## ⌨️ Keyboards

### Inline Keyboard

```javascript
const options = {
    reply_markup: {
        inline_keyboard: [
            [
                { text: 'Button 1', callback_data: 'plugin:action1' },
                { text: 'Button 2', callback_data: 'plugin:action2' }
            ],
            [
                { text: 'URL Button', url: 'https://example.com' }
            ]
        ]
    }
};

await bot.sendMessage(chatId, 'Choose:', options);
```

### Reply Keyboard

```javascript
const options = {
    reply_markup: {
        keyboard: [
            ['Button 1', 'Button 2'],
            ['Button 3']
        ],
        resize_keyboard: true,
        one_time_keyboard: true
    }
};

await bot.sendMessage(chatId, 'Select:', options);
```

### Remove Keyboard

```javascript
await bot.sendMessage(chatId, text, {
    reply_markup: {
        remove_keyboard: true
    }
});
```

## 🎯 Callback Data Format

**Recommended format:** `pluginName:action:param1:param2`

```javascript
// Sending callback
callback_data: 'menu:category:utility'

// Handling callback
async handleCallback(bot, query) {
    const parts = query.data.split(':');
    const plugin = parts[0];  // 'menu'
    const action = parts[1];  // 'category'
    const param = parts[2];   // 'utility'
    
    // Handle action
}
```

## 📝 Common Patterns

### Loading State

```javascript
async execute(bot, msg, args) {
    const chatId = msg.chat.id;
    
    const loading = await bot.sendMessage(chatId, '⏳ Loading...');
    
    // Do work
    const result = await doSomething();
    
    await bot.editMessageText(result, {
        chat_id: chatId,
        message_id: loading.message_id
    });
}
```

### Error Handling

```javascript
async execute(bot, msg, args) {
    const chatId = msg.chat.id;
    
    try {
        // Your code
    } catch (error) {
        console.error('Error:', error);
        await bot.sendMessage(chatId, 
            '❌ Terjadi kesalahan!',
            { parse_mode: 'Markdown' }
        );
    }
}
```

### Argument Validation

```javascript
async execute(bot, msg, args) {
    const chatId = msg.chat.id;
    
    if (args.length === 0) {
        await bot.sendMessage(chatId, 
            '⚠️ Usage: `.command <argument>`'
        );
        return;
    }
    
    // Process arguments
    const input = args.join(' ');
}
```

### Admin Check

```javascript
async execute(bot, msg, args) {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    
    const { config } = require('../src/main');
    
    if (config.adminId && userId !== config.adminId) {
        await bot.sendMessage(chatId, '❌ Admin only!');
        return;
    }
    
    // Admin-only code
}
```

## 🌐 External API Calls

### Using Axios

```javascript
const axios = require('axios');

async execute(bot, msg, args) {
    const chatId = msg.chat.id;
    
    try {
        const response = await axios.get('https://api.example.com/data');
        const data = response.data;
        
        await bot.sendMessage(chatId, JSON.stringify(data, null, 2));
        
    } catch (error) {
        await bot.sendMessage(chatId, '❌ API Error');
    }
}
```

### Using Fetch (Node 18+)

```javascript
async execute(bot, msg, args) {
    const chatId = msg.chat.id;
    
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    
    await bot.sendMessage(chatId, data.result);
}
```

## 💾 Data Storage

### In-Memory (Simple)

```javascript
const cache = new Map();

module.exports = {
    name: 'remember',
    async execute(bot, msg, args) {
        const userId = msg.from.id;
        const data = args.join(' ');
        
        cache.set(userId, data);
        await bot.sendMessage(msg.chat.id, '✅ Saved!');
    }
};
```

### Using Database

```javascript
const db = require('../lib/database');

module.exports = {
    name: 'save',
    async execute(bot, msg, args) {
        const userId = msg.from.id;
        const data = args.join(' ');
        
        await db.saveUser(userId, { note: data });
        await bot.sendMessage(msg.chat.id, '✅ Saved to DB!');
    }
};
```

## 🔍 Accessing Main Exports

```javascript
const { bot, commands, aliases, categories, config } = require('../src/main');

// bot - TelegramBot instance
// commands - Map of all commands
// aliases - Map of aliases to command names
// categories - Map of categories to command arrays
// config - Bot configuration
```

## 📊 Statistics Tracking

```javascript
const statsPlugin = require('./stats');

async execute(bot, msg, args) {
    // Track command usage
    statsPlugin.trackCommand(this.name, msg.from.id);
    
    // Your code
}
```

## 🎭 Media Sending

### Send Photo

```javascript
await bot.sendPhoto(chatId, photoUrl, {
    caption: 'Photo caption'
});

// Or from file
const fs = require('fs');
await bot.sendPhoto(chatId, fs.createReadStream('./image.jpg'));
```

### Send Document

```javascript
await bot.sendDocument(chatId, documentUrl, {
    caption: 'Document caption'
});
```

### Send Video

```javascript
await bot.sendVideo(chatId, videoUrl, {
    caption: 'Video caption',
    supports_streaming: true
});
```

## 🎲 Interactive Elements

### Send Dice

```javascript
await bot.sendDice(chatId, {
    emoji: '🎲'  // 🎲 🎯 🏀 ⚽ 🎰 🎳
});
```

### Send Poll

```javascript
await bot.sendPoll(chatId, 'Question?', [
    'Option 1',
    'Option 2',
    'Option 3'
], {
    is_anonymous: true
});
```

## 🔄 Message Editing

### Edit Text

```javascript
await bot.editMessageText('New text', {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: 'Markdown'
});
```

### Edit Keyboard

```javascript
await bot.editMessageReplyMarkup({
    inline_keyboard: [[
        { text: 'New Button', callback_data: 'new:action' }
    ]]
}, {
    chat_id: chatId,
    message_id: messageId
});
```

## ⚠️ Best Practices

1. **Always answer callbacks:**
```javascript
await bot.answerCallbackQuery(query.id);
```

2. **Use try-catch:**
```javascript
try {
    // risky code
} catch (error) {
    // handle error
}
```

3. **Validate input:**
```javascript
if (!args.length) return;
```

4. **Use loading states:**
```javascript
const msg = await bot.sendMessage(chatId, '⏳ Loading...');
// work
await bot.editMessageText(result, {...});
```

5. **Format messages properly:**
```javascript
const text = `
*Title*

Content here

_Footer_
`.trim();
```

## 📚 Resources

- [node-telegram-bot-api docs](https://github.com/yagop/node-telegram-bot-api)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Markdown guide](https://core.telegram.org/bots/api#markdown-style)

---

**Need more help?** Check existing plugins in `plugins/` folder for examples!
