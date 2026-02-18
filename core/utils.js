/**
 * 🎌 UTILITY FUNCTIONS - ユーティリティ
 */

const moment = require('moment-timezone');

class Utils {
    // Format uptime
    static formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        return `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
    }

    // Format bytes
    static formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Create inline keyboard
    static createInlineKeyboard(buttons) {
        return {
            reply_markup: {
                inline_keyboard: buttons
            }
        };
    }

    // Japanese timestamp
    static getJapaneseTime() {
        return moment().tz('Asia/Tokyo').format('YYYY年MM月DD日 HH:mm:ss');
    }

    // Random anime emoji
    static getRandomEmoji() {
        const emojis = ['🌸', '🎌', '⛩️', '🏯', '🎎', '🎐', '🍡', '🍵', '🗾', '👺'];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }

    // Progress bar
    static createProgressBar(current, total, length = 20) {
        const progress = Math.round((current / total) * length);
        const filled = '█'.repeat(progress);
        const empty = '░'.repeat(length - progress);
        return `${filled}${empty} ${Math.round((current/total)*100)}%`;
    }

    // Escape HTML
    static escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
}

module.exports = Utils;
