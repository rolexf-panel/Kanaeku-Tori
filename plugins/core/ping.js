/**
 * 🎌 PING PLUGIN - ピング
 */

class PingPlugin {
    constructor() {
        this.name = 'ping';
        this.description = 'Check bot latency';
    }

    get commands() {
        return {
            ping: {
                description: 'Check ping/latency',
                execute: async (ctx) => {
                    const { bot, chatId, msg, banner } = ctx;
                    
                    const start = Date.now();
                    const sent = await bot.sendMessage(chatId, '⏱️ Menghitung...');
                    const end = Date.now();
                    
                    const latency = end - start;
                    const apiLatency = Math.round(latency / 2);
                    
                    const text = `
╔════════════════════════════════════════╗
║     🏓 PONG! - ポン!                   ║
╠════════════════════════════════════════╣
║                                        ║
║  ⏱️ Latency: ${latency}ms              ║
║  🌐 API Latency: ~${apiLatency}ms      ║
║  📊 Status: ${latency < 100 ? '🟢 Excellent' : latency < 300 ? '🟡 Good' : '🔴 Slow'}        ║
║                                        ║
║  <i>「速さは美徳なり」</i>               ║
║  "Kecepatan adalah kebajikan"          ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.deleteMessage(chatId, sent.message_id);
                    await bot.sendPhoto(chatId, banner, {
                        caption: text,
                        parse_mode: 'HTML'
                    });
                }
            }
        };
    }
}

module.exports = PingPlugin;
