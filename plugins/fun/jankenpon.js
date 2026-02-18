/**
 * 🎌 JANKENPON PLUGIN - じゃんけんぽん
 */

class JankenponPlugin {
    constructor() {
        this.name = 'jankenpon';
        this.description = 'Rock Paper Scissors game';
        this.choices = ['batu', 'gunting', 'kertas'];
        this.emojis = {
            batu: '✊',
            gunting: '✌️',
            kertas: '✋'
        };
    }

    get commands() {
        return {
            jankenpon: {
                description: 'Play rock paper scissors',
                execute: this.executeGame.bind(this)
            }
        };
    }

    async executeGame(ctx) {
        const { bot, chatId, args, banner } = ctx;
        
        if (args.length === 0) {
            const text = `
╔════════════════════════════════════════╗
║     ✊ JANKENPON - じゃんけんぽん      ║
╠════════════════════════════════════════╣
║                                        ║
║  Pilih salah satu:                     ║
║  ✊ Batu | ✌️ Gunting | ✋ Kertas       ║
║                                        ║
║  Cara main:                            ║
║  /jankenpon [pilihan]                  ║
║  Contoh: /jankenpon batu               ║
║                                        ║
║  Atau klik tombol di bawah:            ║
║                                        ║
╚════════════════════════════════════════╝
            `;
            
            const keyboard = ctx.utils.createInlineKeyboard([
                [
                    { text: '✊ Batu', callback_data: 'jankenpon:play:batu' },
                    { text: '✌️ Gunting', callback_data: 'jankenpon:play:gunting' },
                    { text: '✋ Kertas', callback_data: 'jankenpon:play:kertas' }
                ]
            ]);
            
            await bot.sendPhoto(chatId, banner, {
                caption: text,
                parse_mode: 'HTML',
                ...keyboard
            });
            return;
        }
        
        const userChoice = args[0].toLowerCase();
        if (!this.choices.includes(userChoice)) {
            await bot.sendMessage(chatId, '❌ Pilihan tidak valid! Gunakan: batu, gunting, atau kertas');
            return;
        }
        
        await this.playGame(ctx, userChoice);
    }

    async playGame(ctx, userChoice) {
        const { bot, chatId, banner } = ctx;
        
        const botChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
        const result = this.determineWinner(userChoice, botChoice);
        
        const resultEmoji = result === 'win' ? '🎉' : result === 'lose' ? '😔' : '🤝';
        const resultText = result === 'win' ? 'Kamu Menang!' : result === 'lose' ? 'Kamu Kalah!' : 'Seri!';
        
        const text = `
╔════════════════════════════════════════╗
║     ✊ JANKENPON RESULT - 結果         ║
╠════════════════════════════════════════╣
║                                        ║
║  Kamu: ${this.emojis[userChoice]} ${userChoice.toUpperCase()}          ║
║  Bot: ${this.emojis[botChoice]} ${botChoice.toUpperCase()}           ║
║                                        ║
║  ${resultEmoji} <b>${resultText}</b> ${resultEmoji}                    ║
║                                        ║
╚════════════════════════════════════════╝
        `;
        
        const keyboard = ctx.utils.createInlineKeyboard([
            [
                { text: '🔄 Main Lagi', callback_data: 'jankenpon:menu' }
            ]
        ]);
        
        await bot.sendPhoto(chatId, banner, {
            caption: text,
            parse_mode: 'HTML',
            ...keyboard
        });
    }

    determineWinner(user, bot) {
        if (user === bot) return 'draw';
        if (
            (user === 'batu' && bot === 'gunting') ||
            (user === 'gunting' && bot === 'kertas') ||
            (user === 'kertas' && bot === 'batu')
        ) {
            return 'win';
        }
        return 'lose';
    }

    get callbacks() {
        return {
            play: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, data } = ctx;
                    await bot.deleteMessage(chatId, messageId);
                    await this.playGame(ctx, data);
                }
            },
            
            menu: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, banner } = ctx;
                    await bot.deleteMessage(chatId, messageId);
                    
                    const text = `
╔════════════════════════════════════════╗
║     ✊ JANKENPON - じゃんけんぽん      ║
╠════════════════════════════════════════╣
║                                        ║
║  Pilih salah satu:                     ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    const keyboard = ctx.utils.createInlineKeyboard([
                        [
                            { text: '✊ Batu', callback_data: 'jankenpon:play:batu' },
                            { text: '✌️ Gunting', callback_data: 'jankenpon:play:gunting' },
                            { text: '✋ Kertas', callback_data: 'jankenpon:play:kertas' }
                        ]
                    ]);
                    
                    await bot.sendPhoto(chatId, banner, {
                        caption: text,
                        parse_mode: 'HTML',
                        ...keyboard
                    });
                }
            }
        };
    }
}

module.exports = JankenponPlugin;
