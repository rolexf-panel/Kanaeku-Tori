/**
 * 🎌 ANIME QUOTE PLUGIN - アニメの名言
 */

const axios = require('axios');

class AnimeQuotePlugin {
    constructor() {
        this.name = 'animequote';
        this.description = 'Random anime quotes';
        this.apiUrl = 'https://animechan.xyz/api/random';
    }

    get commands() {
        return {
            animequote: {
                description: 'Get random anime quote',
                execute: this.executeQuote.bind(this)
            }
        };
    }

    async executeQuote(ctx) {
        const { bot, chatId, banner } = ctx;
        
        try {
            // Loading message
            const loading = await bot.sendMessage(chatId, '🎌 Mencari quote...');
            
            const response = await axios.get(this.apiUrl, { timeout: 5000 });
            const data = response.data;
            
            await bot.deleteMessage(chatId, loading.message_id);
            
            const text = `
╔════════════════════════════════════════╗
║     🎌 ANIME QUOTE - アニメの名言      ║
╠════════════════════════════════════════╣
║                                        ║
║  <i>"${data.quote}"</i>                 ║
║                                        ║
║  — <b>${data.character}</b>              ║
║    <code>${data.anime}</code>            ║
║                                        ║
╚════════════════════════════════════════╝
            `;
            
            const keyboard = ctx.utils.createInlineKeyboard([
                [
                    { text: '🔄 Quote Lain', callback_data: 'animequote:refresh' }
                ]
            ]);
            
            await bot.sendPhoto(chatId, banner, {
                caption: text,
                parse_mode: 'HTML',
                ...keyboard
            });
            
        } catch (error) {
            await bot.sendPhoto(chatId, banner, {
                caption: `
╔════════════════════════════════════════╗
║     ⚠️ Gagal mengambil quote           ║
║                                        ║
║  Silakan coba lagi nanti.              ║
║                                        ║
╚════════════════════════════════════════╝
                `,
                parse_mode: 'HTML'
            });
        }
    }

    get callbacks() {
        return {
            refresh: {
                execute: async (ctx) => {
                    // Delete old message and send new quote
                    const { bot, chatId, messageId } = ctx;
                    await bot.deleteMessage(chatId, messageId);
                    await this.executeQuote(ctx);
                }
            }
        };
    }
}

module.exports = AnimeQuotePlugin;
