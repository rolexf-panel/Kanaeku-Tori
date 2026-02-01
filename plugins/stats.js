const { commands, categories } = require('../src/main');

// Simple in-memory stats (in production, use database)
const stats = {
    commandUsage: new Map(),
    userActivity: new Map(),
    startTime: Date.now()
};

module.exports = {
    name: 'stats',
    aliases: ['statistics', 'usage'],
    category: 'info',
    description: 'Melihat statistik penggunaan bot',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        // Calculate stats
        const totalCommands = Array.from(stats.commandUsage.values())
            .reduce((sum, count) => sum + count, 0);
        
        const totalUsers = stats.userActivity.size;
        
        const uptime = Date.now() - stats.startTime;
        const uptimeStr = this.formatUptime(uptime / 1000);
        
        // Get top commands
        const topCommands = Array.from(stats.commandUsage.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        // Build message
        let statsMessage = `
📊 *Statistik Bot*

⏰ *Uptime:* ${uptimeStr}
👥 *Total Users:* ${totalUsers}
📝 *Total Commands:* ${totalCommands}
🔌 *Available Plugins:* ${commands.size}

${topCommands.length > 0 ? '🏆 *Top Commands:*\n' : ''}`;
        
        topCommands.forEach(([cmd, count], index) => {
            statsMessage += `${index + 1}. \`.${cmd}\` - ${count}x\n`;
        });
        
        statsMessage += `\n📂 *Categories:* ${categories.size}`;
        
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '🔄 Refresh', callback_data: 'stats:refresh' },
                        { text: '📋 Details', callback_data: 'stats:details' }
                    ]
                ]
            }
        };
        
        await bot.sendMessage(chatId, statsMessage.trim(), options);
    },
    
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        
        if (action === 'refresh') {
            await this.execute(bot, query.message, []);
            await bot.answerCallbackQuery(query.id, {
                text: '✅ Stats updated',
                show_alert: false
            });
            
        } else if (action === 'details') {
            await this.showDetails(bot, query);
        }
    },
    
    async showDetails(bot, query) {
        const chatId = query.message.chat.id;
        
        let detailsMessage = '📊 *Detailed Statistics*\n\n';
        
        // All commands usage
        const allCommands = Array.from(stats.commandUsage.entries())
            .sort((a, b) => b[1] - a[1]);
        
        if (allCommands.length > 0) {
            detailsMessage += '*All Commands Usage:*\n';
            allCommands.forEach(([cmd, count]) => {
                detailsMessage += `• \`.${cmd}\` - ${count}x\n`;
            });
        } else {
            detailsMessage += '_No command usage data yet_';
        }
        
        await bot.editMessageText(detailsMessage, {
            chat_id: chatId,
            message_id: query.message.message_id,
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔙 Back', callback_data: 'stats:refresh' }]
                ]
            }
        });
        
        await bot.answerCallbackQuery(query.id);
    },
    
    formatUptime(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        const parts = [];
        if (days > 0) parts.push(`${days}d`);
        if (hours > 0) parts.push(`${hours}h`);
        if (minutes > 0) parts.push(`${minutes}m`);
        
        return parts.join(' ') || '< 1m';
    },
    
    // Method to track command usage (call this from main.js)
    trackCommand(commandName, userId) {
        // Track command usage
        const count = stats.commandUsage.get(commandName) || 0;
        stats.commandUsage.set(commandName, count + 1);
        
        // Track user activity
        const userCommands = stats.userActivity.get(userId) || 0;
        stats.userActivity.set(userId, userCommands + 1);
    }
};

// Export stats for external access
module.exports.stats = stats;
