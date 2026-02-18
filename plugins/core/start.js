/**
 * 🎌 START PLUGIN - スタート
 */

class StartPlugin {
    constructor() {
        this.name = 'start';
        this.description = 'Start command with Japanese aesthetic';
        this.version = '1.0.0';
    }

    init(bot) {
        this.bot = bot;
    }

    get commands() {
        return {
            start: {
                description: 'Start the bot',
                execute: this.executeStart.bind(this)
            }
        };
    }

    async executeStart(ctx) {
        const { bot, chatId, userId, msg, banner } = ctx;
        
        const userName = msg.from.first_name;
        const emoji = ctx.utils.getRandomEmoji();
        
        const welcomeText = `
╔════════════════════════════════════════╗
║                                        ║
║     ${emoji} 金明く鳥ボット ${emoji}              ║
║     KANAEKU TORI-BOT                   ║
║                                        ║
╠════════════════════════════════════════╣
║                                        ║
║  こんにちは, ${userName}-san!              ║
║                                        ║
║  Selamat datang di Kanaeku Tori-Bot.   ║
║  Bot dengan tema Jepang yang elegan    ║
║  dan fitur modular yang powerful.      ║
║                                        ║
╠════════════════════════════════════════╣
║  📅 <code>${ctx.utils.getJapaneseTime()}</code>          ║
╚════════════════════════════════════════╝

Gunakan tombol di bawah untuk navigasi:
        `;

        const keyboard = ctx.utils.createInlineKeyboard([
            [
                { text: '📚 Menu Bantuan', callback_data: 'start:help' },
                { text: '⚡ Status Bot', callback_data: 'start:status' }
            ],
            [
                { text: '🌸 Tentang Bot', callback_data: 'start:about' },
                { text: '👤 Profil Saya', callback_data: 'start:profile' }
            ],
            [
                { text: '⛩️ Donasi', url: 'https://saweria.co/yourlink' }
            ]
        ]);

        await bot.sendPhoto(chatId, banner, {
            caption: welcomeText,
            parse_mode: 'HTML',
            ...keyboard
        });
    }

    get callbacks() {
        return {
            help: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, banner } = ctx;
                    
                    const helpText = `
╔════════════════════════════════════════╗
║     📚 PUSAT BANTUAN - ヘルプ          ║
╠════════════════════════════════════════╣
║                                        ║
║  <b>Perintah Dasar:</b>                 ║
║  /start - Mulai bot                    ║
║  /help  - Tampilkan bantuan            ║
║  /ping  - Cek latency                  ║
║  /status - Status sistem               ║
║                                        ║
║  <b>Perintah Fun:</b>                   ║
║  /animequote - Quote anime random      ║
║  /waifu - Gambar waifu random          ║
║  /jankenpon - Main batu-gunting-kertas ║
║                                        ║
║  <b>Perintah Utility:</b>               ║
║  /weather [kota] - Info cuaca          ║
║  /translate [text] - Penerjemah        ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.editMessageCaption(helpText, {
                        chat_id: chatId,
                        message_id: messageId,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '◀️ Kembali', callback_data: 'start:back' }
                            ]]
                        }
                    });
                }
            },
            
            status: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, stats, banner } = ctx;
                    
                    const uptime = ctx.utils.formatUptime(Date.now() - stats.startTime);
                    
                    const statusText = `
╔════════════════════════════════════════╗
║     ⚡ STATUS SISTEM - 状態            ║
╠════════════════════════════════════════╣
║                                        ║
║  🟢 Status: Online                     ║
║  ⏱️ Uptime: ${uptime}                  ║
║  📨 Pesan Diproses: ${stats.messagesProcessed}              ║
║  ⌨️ Perintah Dijalankan: ${stats.commandsExecuted}              ║
║  🌐 Server Time: ${ctx.utils.getJapaneseTime()}        ║
║                                        ║
║  Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB              ║
║  Node: ${process.version}                    ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.editMessageCaption(statusText, {
                        chat_id: chatId,
                        message_id: messageId,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '🔄 Refresh', callback_data: 'start:status' },
                                { text: '◀️ Kembali', callback_data: 'start:back' }
                            ]]
                        }
                    });
                }
            },
            
            about: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, banner } = ctx;
                    
                    const aboutText = `
╔════════════════════════════════════════╗
║     🌸 TENTANG BOT - について          ║
╠════════════════════════════════════════╣
║                                        ║
║  <b>Kanaeku Tori-Bot</b>                ║
║  金明く鳥ボット                        ║
║                                        ║
║  Bot Telegram modular dengan tema      ║
║  Jepang yang elegan. Dibuat dengan     ║
║  ❤️ dan ☕ oleh developer.              ║
║                                        ║
║  <b>Fitur Utama:</b>                    ║
║  • Sistem Plugin Modular               ║
║  • UI dengan Inline Keyboard           ║
║  • Tema Jepang Aesthetic               ║
║  • Multi-API Integration               ║
║                                        ║
║  Version: 1.0.0                        ║
║  License: MIT                          ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.editMessageCaption(aboutText, {
                        chat_id: chatId,
                        message_id: messageId,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '📄 Source Code', url: 'https://github.com/yourrepo' },
                                { text: '◀️ Kembali', callback_data: 'start:back' }
                            ]]
                        }
                    });
                }
            },
            
            profile: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, msg, banner } = ctx;
                    
                    const profileText = `
╔════════════════════════════════════════╗
║     👤 PROFIL ANDA - プロフィール      ║
╠════════════════════════════════════════╣
║                                        ║
║  Nama: ${msg.from.first_name} ${msg.from.last_name || ''}           ║
║  Username: @${msg.from.username || 'N/A'}              ║
║  ID: <code>${msg.from.id}</code>                    ║
║                                        ║
║  Language: ${msg.from.language_code || 'N/A'}                    ║
║  Premium: ${msg.from.is_premium ? '✅ Yes' : '❌ No'}                  ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.editMessageCaption(profileText, {
                        chat_id: chatId,
                        message_id: messageId,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '◀️ Kembali', callback_data: 'start:back' }
                            ]]
                        }
                    });
                }
            },
            
            back: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, msg, banner } = ctx;
                    
                    const userName = msg.from.first_name;
                    const emoji = ctx.utils.getRandomEmoji();
                    
                    const welcomeText = `
╔════════════════════════════════════════╗
║                                        ║
║     ${emoji} 金明く鳥ボット ${emoji}              ║
║     KANAEKU TORI-BOT                   ║
║                                        ║
╠════════════════════════════════════════╣
║                                        ║
║  こんにちは, ${userName}-san!              ║
║                                        ║
║  Selamat datang di Kanaeku Tori-Bot.   ║
║  Bot dengan tema Jepang yang elegan    ║
║  dan fitur modular yang powerful.      ║
║                                        ║
╠════════════════════════════════════════╣
║  📅 <code>${ctx.utils.getJapaneseTime()}</code>          ║
╚════════════════════════════════════════╝

Gunakan tombol di bawah untuk navigasi:
                    `;

                    const keyboard = ctx.utils.createInlineKeyboard([
                        [
                            { text: '📚 Menu Bantuan', callback_data: 'start:help' },
                            { text: '⚡ Status Bot', callback_data: 'start:status' }
                        ],
                        [
                            { text: '🌸 Tentang Bot', callback_data: 'start:about' },
                            { text: '👤 Profil Saya', callback_data: 'start:profile' }
                        ],
                        [
                            { text: '⛩️ Donasi', url: 'https://saweria.co/yourlink' }
                        ]
                    ]);

                    await bot.editMessageCaption(welcomeText, {
                        chat_id: chatId,
                        message_id: messageId,
                        parse_mode: 'HTML',
                        ...keyboard
                    });
                }
            }
        };
    }
}

module.exports = StartPlugin;
