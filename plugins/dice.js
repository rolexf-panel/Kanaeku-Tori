module.exports = {
    name: 'dice',
    aliases: ['roll', 'dadu'],
    category: 'fun',
    description: 'Lempar dadu virtual',
    usage: '`.dice` atau `.dice 2d6` untuk 2 dadu 6 sisi',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        // Parse dice notation (e.g., 2d6 = 2 dice with 6 sides)
        let numDice = 1;
        let numSides = 6;
        
        if (args.length > 0) {
            const diceNotation = args[0].toLowerCase();
            const match = diceNotation.match(/^(\d+)d(\d+)$/);
            
            if (match) {
                numDice = parseInt(match[1]);
                numSides = parseInt(match[2]);
                
                // Validate limits
                if (numDice > 10) {
                    await bot.sendMessage(chatId, '⚠️ Maksimal 10 dadu sekaligus!');
                    return;
                }
                if (numSides > 100) {
                    await bot.sendMessage(chatId, '⚠️ Maksimal 100 sisi per dadu!');
                    return;
                }
            }
        }
        
        // Roll the dice
        const rolls = [];
        let total = 0;
        
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * numSides) + 1;
            rolls.push(roll);
            total += roll;
        }
        
        // Build result message
        let resultMessage = `🎲 *Dice Roll*\n\n`;
        
        if (numDice === 1) {
            resultMessage += `Hasil: *${rolls[0]}* `;
            resultMessage += this.getDiceEmoji(rolls[0]);
        } else {
            resultMessage += `Notasi: ${numDice}d${numSides}\n`;
            resultMessage += `Hasil: ${rolls.map(r => `*${r}*`).join(' + ')}\n`;
            resultMessage += `Total: *${total}*\n\n`;
            resultMessage += `Rata-rata: ${(total / numDice).toFixed(2)}`;
        }
        
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🎲 Roll Again', callback_data: `dice:roll:${numDice}d${numSides}` }
                    ],
                    [
                        { text: '1d6', callback_data: 'dice:roll:1d6' },
                        { text: '2d6', callback_data: 'dice:roll:2d6' },
                        { text: '1d20', callback_data: 'dice:roll:1d20' }
                    ]
                ]
            }
        };
        
        await bot.sendMessage(chatId, resultMessage, options);
    },
    
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        
        if (action === 'roll') {
            const notation = parts[2];
            await this.execute(bot, query.message, [notation]);
            await bot.answerCallbackQuery(query.id);
        }
    },
    
    getDiceEmoji(num) {
        const diceEmojis = {
            1: '⚀',
            2: '⚁',
            3: '⚂',
            4: '⚃',
            5: '⚄',
            6: '⚅'
        };
        return diceEmojis[num] || '🎲';
    }
};
