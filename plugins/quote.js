const axios = require('axios');

module.exports = {
    name: 'quote',
    aliases: ['q', 'inspire'],
    category: 'fun',
    description: 'Mendapatkan quote inspiratif random',
    usage: '`.quote` - Dapatkan quote random',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        // Send loading message
        const loadingMsg = await bot.sendMessage(chatId, '⏳ Mengambil quote...');
        
        try {
            // Fetch quote from API
            const response = await axios.get('https://api.quotable.io/random');
            const quote = response.data;
            
            const quoteMessage = `
💭 *Quote of the Moment*

"_${quote.content}_"

— *${quote.author}*

🏷️ Tags: ${quote.tags.join(', ')}
            `.trim();
            
            const options = {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '🔄 Quote Lain', callback_data: 'quote:random' },
                            { text: '❤️ Save', callback_data: 'quote:save' }
                        ]
                    ]
                }
            };
            
            await bot.editMessageText(quoteMessage, {
                chat_id: chatId,
                message_id: loadingMsg.message_id,
                ...options
            });
            
        } catch (error) {
            console.error('Quote fetch error:', error);
            
            // Fallback quotes jika API gagal
            const fallbackQuotes = [
                { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
                { content: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
                { content: 'Stay hungry, stay foolish.', author: 'Steve Jobs' },
                { content: 'Code is like humor. When you have to explain it, it\'s bad.', author: 'Cory House' }
            ];
            
            const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            
            const fallbackMessage = `
💭 *Inspirational Quote*

"_${randomQuote.content}_"

— *${randomQuote.author}*
            `.trim();
            
            await bot.editMessageText(fallbackMessage, {
                chat_id: chatId,
                message_id: loadingMsg.message_id,
                parse_mode: 'Markdown'
            });
        }
    },
    
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        
        if (action === 'random') {
            // Get new quote
            await this.execute(bot, query.message, []);
            await bot.answerCallbackQuery(query.id);
            
        } else if (action === 'save') {
            await bot.answerCallbackQuery(query.id, {
                text: '💾 Quote saved! (Feature coming soon)',
                show_alert: true
            });
        }
    }
};
