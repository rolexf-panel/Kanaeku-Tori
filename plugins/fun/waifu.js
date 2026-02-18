/**
 * 🎌 WAIFU PLUGIN - ワイフ
 */

const axios = require('axios');

class WaifuPlugin {
    constructor() {
        this.name = 'waifu';
        this.description = 'Random waifu images';
        this.baseUrl = 'https://api.waifu.im';
    }

    get commands() {
        return {
            waifu: {
                description: 'Get random waifu image',
                execute: this.executeWaifu.bind(this)
            }
        };
    }

    async executeWaifu(ctx) {
        const { bot, chatId, args } = ctx;
        
        const tag = args[0] || 'waifu';
        const allowedTags = ['maid', 'waifu', 'marin-kitagawa', 'mori-calliope', 
                           'raiden-shogun', 'oppai', 'selfies', 'uniform'];
        
        const selectedTag = allowedTags.includes(tag) ? tag : 'waifu';
        
        try {
            const loading = await bot.sendMessage(chatId, '🌸 Mencari waifu...');
            
            const response = await axios.get(`${this.baseUrl}/search`, {
                params: {
                    included_tags: selectedTag,
                    is_nsfw: false
                },
                timeout: 10000
            });
            
            await bot.deleteMessage(chatId, loading.message_id);
            
            if (response.data.images && response.data.images.length > 0) {
                const image = response.data.images[0];
                
                const text = `
╔════════════════════════════════════════╗
║     🌸 RANDOM WAIFU - ワイフ           ║
╠════════════════════════════════════════╣
║                                        ║
║  Source: ${image.source || 'Unknown'}  ║
║  Artist: ${image.artist || 'Unknown'}  ║
║  Tag: ${selectedTag}                   ║
║                                        ║
╚════════════════════════════════════════╝
                `;
                
                const keyboard = ctx.utils.createInlineKeyboard([
                    [
                        { text: '🔄 Lagi', callback_data: `waifu:refresh:${selectedTag}` },
                        { text: '📋 Tags', callback_data: 'waifu:tags' }
                    ],
                    [
                        { text: '🔗 Source', url: image.source || 'https://waifu.im' }
                    ]
                ]);
                
                await bot.sendPhoto(chatId, image.url, {
                    caption: text,
                    parse_mode: 'HTML',
                    ...keyboard
                });
            }
            
        } catch (error) {
            await bot.sendMessage(chatId, '❌ Gagal mengambil gambar. Coba lagi nanti.');
        }
    }

    get callbacks() {
        return {
            refresh: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, data } = ctx;
                    await bot.deleteMessage(chatId, messageId);
                    
                    // Parse tag from callback data
                    const tag = data || 'waifu';
                    ctx.args = [tag];
                    await this.executeWaifu(ctx);
                }
            },
            
            tags: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId } = ctx;
                    
                    const tagsList = [
                        'maid', 'waifu', 'marin-kitagawa', 
                        'mori-calliope', 'raiden-shogun', 
                        'oppai', 'selfies', 'uniform'
                    ];
                    
                    const buttons = tagsList.map(tag => ({
                        text: tag,
                        callback_data: `waifu:refresh:${tag}`
                    }));
                    
                    // Split into rows of 2
                    const keyboard = [];
                    for (let i = 0; i < buttons.length; i += 2) {
                        keyboard.push(buttons.slice(i, i + 2));
                    }
                    keyboard.push([{ text: '◀️ Kembali', callback_data: 'waifu:back' }]);
                    
                    await bot.editMessageCaption(
                        'Pilih tag waifu:',
                        {
                            chat_id: chatId,
                            message_id: messageId,
                            reply_markup: { inline_keyboard: keyboard }
                        }
                    );
                }
            },
            
            back: {
                execute: async (ctx) => {
                    await this.callbacks.refresh.execute(ctx);
                }
            }
        };
    }
}

module.exports = WaifuPlugin;
