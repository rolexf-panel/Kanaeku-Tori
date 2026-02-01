module.exports = {
    name: 'calc',
    aliases: ['calculator', 'hitung'],
    category: 'utility',
    description: 'Kalkulator sederhana',
    usage: '`.calc 5 + 3` atau `.calc 10 * 2`',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        if (args.length === 0) {
            // Show calculator interface
            await this.showCalculator(bot, chatId);
            return;
        }
        
        // Process calculation
        const expression = args.join(' ');
        const result = this.calculate(expression);
        
        if (result.error) {
            await bot.sendMessage(chatId, `❌ Error: ${result.error}`);
        } else {
            await bot.sendMessage(chatId, `🧮 *Kalkulator*\n\n\`${expression}\` = *${result.value}*`, {
                parse_mode: 'Markdown'
            });
        }
    },
    
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        
        if (action === 'show') {
            await this.showCalculator(bot, query.message.chat.id);
            await bot.answerCallbackQuery(query.id);
        }
    },
    
    async showCalculator(bot, chatId) {
        const text = `
🧮 *KALKULATOR*

Gunakan perintah dengan format:
\`.calc [angka] [operator] [angka]\`

*Operator yang didukung:*
• \`+\` Penjumlahan
• \`-\` Pengurangan
• \`*\` Perkalian
• \`/\` Pembagian
• \`%\` Modulus
• \`**\` Pangkat

*Contoh:*
• \`.calc 5 + 3\` → 8
• \`.calc 10 * 2\` → 20
• \`.calc 2 ** 3\` → 8
• \`.calc 15 / 3\` → 5
        `.trim();
        
        await bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
    },
    
    calculate(expression) {
        try {
            // Clean the expression
            expression = expression.replace(/[^0-9+\-*/(). %]/g, '');
            
            // Prevent eval injection by validating
            if (!/^[\d+\-*/(). %]+$/.test(expression)) {
                return { error: 'Ekspresi tidak valid' };
            }
            
            // Calculate
            const result = eval(expression);
            
            if (!isFinite(result)) {
                return { error: 'Hasil tidak valid (infinity atau NaN)' };
            }
            
            return { value: result };
            
        } catch (error) {
            return { error: 'Gagal menghitung ekspresi' };
        }
    }
};
