/**
 * 🎌 STATUS PLUGIN - 状態
 */

const os = require('os');

class StatusPlugin {
    constructor() {
        this.name = 'status';
        this.description = 'System status';
    }

    get commands() {
        return {
            status: {
                description: 'Show system status',
                execute: async (ctx) => {
                    const { bot, chatId, stats, banner } = ctx;
                    
                    const uptime = ctx.utils.formatUptime(Date.now() - stats.startTime);
                    const memoryUsage = process.memoryUsage();
                    const totalMem = os.totalmem();
                    const freeMem = os.freemem();
                    const usedMem = totalMem - freeMem;
                    
                    const text = `
╔════════════════════════════════════════╗
║     ⚡ SYSTEM STATUS - システム状態    ║
╠════════════════════════════════════════╣
║                                        ║
║  <b>🤖 Bot Statistics:</b>              ║
║  Uptime: ${uptime}                     ║
║  Messages: ${stats.messagesProcessed}                    ║
║  Commands: ${stats.commandsExecuted}                     ║
║                                        ║
║  <b>💻 System Info:</b>                 ║
║  Platform: ${os.platform()} ${os.arch()}              ║
║  Node.js: ${process.version}                   ║
║  CPU: ${os.cpus()[0].model.split(' ')[0]} ${os.cpus().length} cores        ║
║                                        ║
║  <b>🧠 Memory:</b>                      ║
║  Used: ${ctx.utils.formatBytes(usedMem)} / ${ctx.utils.formatBytes(totalMem)}    ║
║  ${ctx.utils.createProgressBar(usedMem, totalMem, 15)}      ║
║                                        ║
║  Heap: ${ctx.utils.formatBytes(memoryUsage.heapUsed)} / ${ctx.utils.formatBytes(memoryUsage.heapTotal)}  ║
║  ${ctx.utils.createProgressBar(memoryUsage.heapUsed, memoryUsage.heapTotal, 15)}      ║
║                                        ║
║  📅 ${ctx.utils.getJapaneseTime()}           ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.sendPhoto(chatId, banner, {
                        caption: text,
                        parse_mode: 'HTML'
                    });
                }
            }
        };
    }
}

module.exports = StatusPlugin;
