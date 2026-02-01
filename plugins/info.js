const { version } = require('../package.json');
const os = require('os');

module.exports = {
    name: 'info',
    aliases: ['about', 'botinfo'],
    category: 'general',
    description: 'Menampilkan informasi tentang bot',
    
    async execute(bot, msg, args) {
        const { commands, categories, config } = require('../src/main');
        const chatId = msg.chat.id;
        
        // Calculate uptime
        const uptime = process.uptime();
        const uptimeStr = this.formatUptime(uptime);
        
        // System info
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        
        const infoText = `
ℹ️ *INFORMASI BOT*

🦅 *${config.botName}*
📦 Version: \`${version}\`
🤖 Platform: Node.js ${process.version}

📊 *Statistik:*
• Total Perintah: ${commands.size}
• Total Kategori: ${categories.size}
• Uptime: ${uptimeStr}

💻 *Sistem:*
• Platform: ${os.platform()} (${os.arch()})
• CPU: ${os.cpus()[0].model}
• Memory: ${usedMem}GB / ${totalMem}GB

🔧 *Arsitektur:*
• Modular & Pluggable
• Hot Reload Support
• Callback Query Handler

👨‍💻 *Developer Info:*
Framework ini menggunakan arsitektur modular yang memungkinkan penambahan fitur dengan mudah melalui sistem plugin.

Prefix yang didukung: ${config.prefix.map(p => `\`${p}\``).join(', ')}
        `.trim();
        
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '📋 Menu', callback_data: 'menu:show' },
                        { text: '❓ Help', callback_data: 'help:show' }
                    ],
                    [
                        { text: '🔄 Refresh', callback_data: 'info:refresh' }
                    ]
                ]
            }
        };
        
        await bot.sendMessage(chatId, infoText, options);
    },
    
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        
        if (action === 'show' || action === 'refresh') {
            await this.execute(bot, query.message, []);
            await bot.answerCallbackQuery(query.id, {
                text: '✅ Informasi diperbarui',
                show_alert: false
            });
        }
    },
    
    formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        
        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
        
        return parts.join(' ');
    }
};
