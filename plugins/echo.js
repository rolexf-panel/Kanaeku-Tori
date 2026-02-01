module.exports = {
    name: 'echo',
    aliases: ['say', 'repeat'],
    category: 'utility',
    description: 'Mengulangi pesan yang Anda kirim',
    usage: '`.echo Halo dunia!` - Bot akan mengulangi "Halo dunia!"',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        if (args.length === 0) {
            await bot.sendMessage(chatId, '⚠️ Silakan ketik pesan yang ingin diulangi.\n\nContoh: `.echo Halo dunia!`');
            return;
        }
        
        const text = args.join(' ');
        
        await bot.sendMessage(chatId, `🔊 *Echo:*\n\n${text}`, {
            parse_mode: 'Markdown'
        });
    }
};
