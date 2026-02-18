/**
 * 🎌 HELP PLUGIN - ヘルプ
 */

class HelpPlugin {
    constructor() {
        this.name = 'help';
        this.description = 'Help command';
    }

    get commands() {
        return {
            help: {
                description: 'Show help menu',
                execute: async (ctx) => {
                    const { bot, chatId, banner } = ctx;
                    
                    const text = `
╔════════════════════════════════════════╗
║     📚 DAFTAR PERINTAH - コマンド      ║
╠════════════════════════════════════════╣
║                                        ║
║  <b>🎯 Core Commands:</b>               ║
║  /start - Mulai bot                    ║
║  /help  - Bantuan ini                  ║
║  /ping  - Cek kecepatan respons        ║
║  /status - Status sistem               ║
║                                        ║
║  <b>🎮 Fun Commands:</b>                ║
║  /animequote - Quote anime             ║
║  /waifu - Random waifu image           ║
║  /jankenpon - Main jankenpon           ║
║                                        ║
║  <b>🛠️ Utility Commands:</b>            ║
║  /weather [kota] - Info cuaca          ║
║  /translate [text] - Terjemahan        ║
║  /reminder [waktu] [pesan] - Pengingat ║
║                                        ║
║  <b>👑 Admin Commands:</b>              ║
║  /broadcast [pesan] - Siaran ke semua  ║
║  /maintenance - Toggle maintenance     ║
║                                        ║
╚════════════════════════════════════════╝

💡 <i>Tips: Gunakan inline keyboard untuk navigasi lebih mudah!</i>
                    `;
                    
                    const keyboard = ctx.utils.createInlineKeyboard([
                        [
                            { text: '🎮 Menu Fun', callback_data: 'help:fun' },
                            { text: '🛠️ Menu Utility', callback_data: 'help:utility' }
                        ],
                        [
                            { text: '🏠 Kembali ke Start', callback_data: 'start:back' }
                        ]
                    ]);
                    
                    await bot.sendPhoto(chatId, banner, {
                        caption: text,
                        parse_mode: 'HTML',
                        ...keyboard
                    });
                }
            }
        };
    }

    get callbacks() {
        return {
            fun: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, banner } = ctx;
                    
                    const text = `
╔════════════════════════════════════════╗
║     🎮 FUN COMMANDS - 娯楽             ║
╠════════════════════════════════════════╣
║                                        ║
║  <b>/animequote</b>                     ║
║  Mendapatkan quote anime random        ║
║  beserta karakter dan judul anime.     ║
║                                        ║
║  <b>/waifu [tag]</b>                    ║
║  Gambar waifu random dari waifu.im     ║
║  Tags: maid, waifu, marin-kitagawa,    ║
║  mori-calliope, raiden-shogun, oppai,  ║
║  selfies, uniform, etc.                ║
║                                        ║
║  <b>/jankenpon [pilihan]</b>            ║
║  Main batu-gunting-kertas dengan bot   ║
║  Pilihan: batu, gunting, kertas        ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.editMessageCaption(text, {
                        chat_id: chatId,
                        message_id: messageId,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '◀️ Kembali', callback_data: 'help:back' }
                            ]]
                        }
                    });
                }
            },
            
            utility: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, banner } = ctx;
                    
                    const text = `
╔════════════════════════════════════════╗
║     🛠️ UTILITY COMMANDS - ユーティリティ ║
╠════════════════════════════════════════╣
║                                        ║
║  <b>/weather [nama kota]</b>            ║
║  Info cuaca real-time                  ║
║  Contoh: /weather Tokyo                ║
║                                        ║
║  <b>/translate [kode bahasa] [text]</b> ║
║  Menerjemahkan teks                    ║
║  Contoh: /translate ja Hello World     ║
║  (ja=Jepang, en=Inggris, id=Indonesia) ║
║                                        ║
║  <b>/reminder [menit] [pesan]</b>       ║
║  Pengingat sederhana                   ║
║  Contoh: /reminder 30 Minum air        ║
║                                        ║
╚════════════════════════════════════════╝
                    `;
                    
                    await bot.editMessageCaption(text, {
                        chat_id: chatId,
                        message_id: messageId,
                        parse_mode: 'HTML',
                        reply_markup: {
                            inline_keyboard: [[
                                { text: '◀️ Kembali', callback_data: 'help:back' }
                            ]]
                        }
                    });
                }
            },
            
            back: {
                execute: async (ctx) => {
                    // Trigger help command again
                    const fakeCtx = { ...ctx };
                    fakeCtx.args = [];
                    await this.commands.help.execute(fakeCtx);
                }
            }
        };
    }
}

module.exports = HelpPlugin;
