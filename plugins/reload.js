const { config, loadPlugins } = require('../src/main');

module.exports = {
    name: 'reload',
    aliases: ['r', 'refresh'],
    category: 'admin',
    description: 'Memuat ulang semua plugin (Admin only)',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        
        // Check if user is admin
        if (config.adminId && userId !== config.adminId) {
            await bot.sendMessage(chatId, '❌ Perintah ini hanya untuk admin!');
            return;
        }
        
        const statusMsg = await bot.sendMessage(chatId, '🔄 Memuat ulang plugin...');
        
        try {
            // Reload plugins
            console.log('\n\x1b[36m[RELOAD]\x1b[0m Hot reloading plugins...');
            loadPlugins();
            
            await bot.editMessageText(
                '✅ *Plugin berhasil dimuat ulang!*\n\nSemua perubahan telah diterapkan.',
                {
                    chat_id: chatId,
                    message_id: statusMsg.message_id,
                    parse_mode: 'Markdown'
                }
            );
            
        } catch (error) {
            console.error('Reload error:', error);
            await bot.editMessageText(
                `❌ *Gagal memuat ulang plugin*\n\nError: \`${error.message}\``,
                {
                    chat_id: chatId,
                    message_id: statusMsg.message_id,
                    parse_mode: 'Markdown'
                }
            );
        }
    }
};
