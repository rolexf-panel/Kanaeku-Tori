module.exports = {
    name: 'help',
    aliases: ['h', 'bantuan'],
    category: 'general',
    description: 'Menampilkan bantuan dan informasi perintah',
    
    async execute(bot, msg, args) {
        const { config } = require('../src/main');
        const chatId = msg.chat.id;
        
        // If specific command requested
        if (args.length > 0) {
            const cmdName = args[0].toLowerCase();
            const cmd = this.findCommand(cmdName);
            
            if (cmd) {
                await this.showCommandHelp(bot, chatId, cmd);
            } else {
                await bot.sendMessage(chatId, `⚠️ Perintah \`.${cmdName}\` tidak ditemukan.\n\nGunakan \`.help\` untuk melihat semua perintah.`);
            }
            return;
        }
        
        // General help
        const helpText = `
📖 *BANTUAN - ${config.botName}*

🔰 *Cara Menggunakan Bot:*
Gunakan salah satu prefix berikut:
• \`.perintah\`
• \`/perintah\`
• \`liona perintah\`

📝 *Contoh Penggunaan:*
• \`.menu\` - Lihat menu utama
• \`.help ping\` - Bantuan untuk perintah ping
• \`liona info\` - Informasi bot

🎯 *Perintah Utama:*
• \`.start\` - Mulai menggunakan bot
• \`.menu\` - Tampilkan menu kategori
• \`.help [perintah]\` - Bantuan detail
• \`.info\` - Informasi tentang bot
• \`.ping\` - Cek kecepatan respons

💡 *Tips:*
• Gunakan tombol interaktif untuk navigasi lebih mudah
• Setiap perintah memiliki alias yang bisa digunakan
• Ketik \`.help namaPerintah\` untuk detail lengkap

Ketik \`.menu\` untuk melihat semua fitur yang tersedia!
        `.trim();
        
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '📋 Menu', callback_data: 'menu:show' },
                        { text: 'ℹ️ Info', callback_data: 'info:show' }
                    ]
                ]
            }
        };
        
        await bot.sendMessage(chatId, helpText, options);
    },
    
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        
        if (action === 'show') {
            await this.execute(bot, query.message, []);
            await bot.answerCallbackQuery(query.id);
        }
    },
    
    async showCommandHelp(bot, chatId, cmd) {
        const aliases = cmd.aliases && cmd.aliases.length > 0 
            ? cmd.aliases.map(a => `\`.${a}\``).join(', ')
            : 'Tidak ada';
        
        const helpText = `
📌 *Detail Perintah*

*Nama:* \`.${cmd.name}\`
*Kategori:* ${cmd.category || 'general'}
*Deskripsi:* ${cmd.description}
*Alias:* ${aliases}

*Cara Penggunaan:*
\`.${cmd.name}\` atau \`/${cmd.name}\` atau \`liona ${cmd.name}\`

${cmd.usage ? `*Contoh:*\n${cmd.usage}` : ''}
        `.trim();
        
        await bot.sendMessage(chatId, helpText, { parse_mode: 'Markdown' });
    },
    
    findCommand(name) {
        const { commands } = require('../src/main');
        // Check direct command
        if (commands.has(name)) {
            return commands.get(name);
        }
        
        // Check aliases
        for (const [cmdName, cmd] of commands) {
            if (cmd.aliases && cmd.aliases.includes(name)) {
                return cmd;
            }
        }
        
        return null;
    }
};
