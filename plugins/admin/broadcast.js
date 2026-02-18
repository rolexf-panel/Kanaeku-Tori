/**
 * 🎌 BROADCAST PLUGIN - 放送
 */

const fs = require('fs-extra');

class BroadcastPlugin {
    constructor() {
        this.name = 'broadcast';
        this.description = 'Broadcast message to all users';
    }

    init(bot) {
        this.config = require('../../config/config.js');
    }

    get commands() {
        return {
            broadcast: {
                description: 'Broadcast message (Admin only)',
                execute: this.executeBroadcast.bind(this)
            }
        };
    }

    async executeBroadcast(ctx) {
        const { bot, chatId, userId, args, banner } = ctx;
        
        // Check if user is owner
        if (userId.toString() !== this.config.telegram.ownerId) {
            await bot.sendPhoto(chatId, banner, {
                caption: `
╔════════════════════════════════════════╗
║     ⛔ ACCESS DENIED - アクセス拒否    ║
╠════════════════════════════════════════╣
║                                        ║
║  Kamu tidak memiliki izin untuk        ║
║  menggunakan perintah ini.             ║
║                                        ║
║  <i>「お前はもう死んでいる」</i>         ║
║                                        ║
╚════════════════════════════════════════╝
                `,
                parse_mode: 'HTML'
            });
            return;
        }
        
        if (args.length === 0) {
            await bot.sendPhoto(chatId, banner, {
                caption: `
╔════════════════════════════════════════╗
║     📢 BROADCAST - 放送                ║
╠════════════════════════════════════════╣
║                                        ║
║  Penggunaan:                           ║
║  /broadcast [pesan]                    ║
║                                        ║
║  Contoh:                               ║
║  /broadcast Halo semua pengguna!       ║
║                                        ║
╚════════════════════════════════════════╝
                `,
                parse_mode: 'HTML'
            });
            return;
        }
        
        const message = args.join(' ');
        
        try {
            // Read users database (simplified - in production use proper DB)
            const dbPath = './database/users.json';
            let users = [];
            
            if (await fs.pathExists(dbPath)) {
                users = await fs.readJson(dbPath);
            }
            
            if (users.length === 0) {
                await bot.sendMessage(chatId, '⚠️ Tidak ada pengguna yang terdaftar.');
                return;
            }
            
            let success = 0;
            let failed = 0;
            
            const statusMsg = await bot.sendMessage(chatId, `📢 Mengirim broadcast ke ${users.length} pengguna...`);
            
            for (const userId of users) {
                try {
                    await bot.sendMessage(userId, `
╔════════════════════════════════════════╗
║     📢 PENGUMUMAN - お知らせ           ║
╠════════════════════════════════════════╣
║                                        ║
║  ${message}                            ║
║                                        ║
╠════════════════════════════════════════╣
║  Dari: Admin Kanaeku Tori-Bot          ║
╚════════════════════════════════════════╝
                    `, { parse_mode: 'HTML' });
                    success++;
                } catch (err) {
                    failed++;
                }
                
                // Delay to avoid rate limit
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            
            await bot.editMessageText(`
╔════════════════════════════════════════╗
║     ✅ BROADCAST SELESAI               ║
╠════════════════════════════════════════╣
║                                        ║
║  Total Pengguna: ${users.length}                     ║
║  Berhasil: ${success}                      ║
║  Gagal: ${failed}                       ║
║                                        ║
╚════════════════════════════════════════╝
            `, {
                chat_id: chatId,
                message_id: statusMsg.message_id,
                parse_mode: 'HTML'
            });
            
        } catch (error) {
            await bot.sendMessage(chatId, '❌ Gagal mengirim broadcast.');
        }
    }
}

module.exports = BroadcastPlugin;
