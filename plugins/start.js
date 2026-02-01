const path = require('path');
const fs = require('fs');

module.exports = {
    name: 'start',
    aliases: ['mulai', 'begin'],
    category: 'general',
    description: 'Menampilkan pesan selamat datang',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        const userName = msg.from.first_name || 'Pengguna';
        const mediaPath = path.join(__dirname, '../media/image.jpg');
        
        const welcomeMessage = `
👋 Halo, *${userName}*!

Selamat datang di *Kanaeku Tori Bot* 🦅

Bot ini menggunakan arsitektur modular dengan berbagai fitur yang dapat dikustomisasi.

📚 *Cara Menggunakan:*
Gunakan prefix: \`.\`, \`/\`, atau \`liona\`
Contoh: \`.menu\` atau \`/help\`

💡 *Perintah Utama:*
• \`.menu\` - Tampilkan menu utama
• \`.help\` - Lihat daftar perintah
• \`.info\` - Informasi bot

Mulai dengan mengetik \`.menu\` untuk melihat semua fitur!
        `.trim();
        
        const options = {
            caption: welcomeMessage,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '📋 Menu', callback_data: 'menu:show' },
                        { text: '❓ Help', callback_data: 'help:show' }
                    ],
                    [
                        { text: 'ℹ️ Info Bot', callback_data: 'info:show' }
                    ]
                ]
            }
        };
        
        try {
            if (fs.existsSync(mediaPath)) {
                await bot.sendPhoto(chatId, mediaPath, options);
            } else {
                await bot.sendMessage(chatId, welcomeMessage, options);
            }
        } catch (e) {
            await bot.sendMessage(chatId, welcomeMessage, options);
        }
    }
};
