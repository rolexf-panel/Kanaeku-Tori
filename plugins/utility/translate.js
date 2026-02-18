/**
 * 🎌 TRANSLATE PLUGIN - 翻訳
 */

const axios = require('axios');

class TranslatePlugin {
    constructor() {
        this.name = 'translate';
        this.description = 'Text translation';
        this.languages = {
            'id': 'Indonesia',
            'en': 'English',
            'ja': '日本語 (Jepang)',
            'ko': '한국어 (Korea)',
            'zh': '中文 (Cina)',
            'ar': 'العربية (Arab)',
            'es': 'Español (Spanyol)',
            'fr': 'Français (Prancis)',
            'de': 'Deutsch (Jerman)'
        };
    }

    get commands() {
        return {
            translate: {
                description: 'Translate text',
                execute: this.executeTranslate.bind(this)
            }
        };
    }

    async executeTranslate(ctx) {
        const { bot, chatId, args, banner } = ctx;
        
        if (args.length < 2) {
            const langList = Object.entries(this.languages)
                .map(([code, name]) => `${code}: ${name}`)
                .join('\n║  ');
            
            const text = `
╔════════════════════════════════════════╗
║     🌐 TRANSLATE - 翻訳                ║
╠════════════════════════════════════════╣
║                                        ║
║  Penggunaan:                           ║
║  /translate [kode] [teks]              ║
║                                        ║
║  Contoh:                               ║
║  /translate ja Hello World             ║
║  /translate en こんにちは              ║
║                                        ║
║  <b>Kode Bahasa:</b>                     ║
║  ${langList}              ║
║                                        ║
╚════════════════════════════════════════╝
            `;
            
            await bot.sendPhoto(chatId, banner, {
                caption: text,
                parse_mode: 'HTML'
            });
            return;
        }
        
        const targetLang = args[0].toLowerCase();
        const textToTranslate = args.slice(1).join(' ');
        
        try {
            // Using MyMemory API (Free, no key required)
            const response = await axios.get('https://api.mymemory.translated.net/get', {
                params: {
                    q: textToTranslate,
                    langpair: `auto|${targetLang}`
                },
                timeout: 10000
            });
            
            const data = response.data;
            const translated = data.responseData.translatedText;
            const detectedLang = data.responseData.match || 'Unknown';
            
            const resultText = `
╔════════════════════════════════════════╗
║     🌐 TRANSLATION RESULT - 翻訳結果   ║
╠════════════════════════════════════════╣
║                                        ║
║  <b>Original:</b>                        ║
║  <i>${textToTranslate}</i>               ║
║                                        ║
║  <b>Translated (${this.languages[targetLang] || targetLang}):</b>  ║
║  <code>${translated}</code>              ║
║                                        ║
║  Confidence: ${data.responseData.match || 'N/A'}%                    ║
║                                        ║
╚════════════════════════════════════════╝
            `;
            
            const keyboard = ctx.utils.createInlineKeyboard([
                [
                    { text: '🔄 Translate Lagi', callback_data: `translate:again:${targetLang}` }
                ]
            ]);
            
            await bot.sendPhoto(chatId, banner, {
                caption: resultText,
                parse_mode: 'HTML',
                ...keyboard
            });
            
        } catch (error) {
            await bot.sendMessage(chatId, '❌ Gagal menerjemahkan. Silakan coba lagi.');
        }
    }

    get callbacks() {
        return {
            again: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId } = ctx;
                    await bot.deleteMessage(chatId, messageId);
                    await bot.sendMessage(chatId, `
╔════════════════════════════════════════╗
║     🌐 TRANSLATE - 翻訳                ║
╠════════════════════════════════════════╣
║                                        ║
║  Silakan gunakan perintah:             ║
║  /translate [kode] [teks]              ║
║                                        ║
╚════════════════════════════════════════╝
                    `, { parse_mode: 'HTML' });
                }
            }
        };
    }
}

module.exports = TranslatePlugin;
