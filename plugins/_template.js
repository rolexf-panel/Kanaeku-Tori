/**
 * PLUGIN TEMPLATE
 * 
 * Copy file ini dan rename sesuai fitur yang ingin dibuat.
 * Uncomment dan edit sesuai kebutuhan.
 */

module.exports = {
    // Nama command utama (REQUIRED)
    name: 'template',
    
    // Alias untuk command (OPTIONAL)
    aliases: ['tmp', 'tpl'],
    
    // Kategori plugin (OPTIONAL, default: 'general')
    category: 'example',
    
    // Deskripsi singkat (REQUIRED)
    description: 'Template plugin untuk referensi',
    
    // Contoh penggunaan (OPTIONAL)
    usage: '`.template [argument]` - Penjelasan argumen',
    
    // Handler utama untuk command (REQUIRED)
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        const userName = msg.from.first_name || 'User';
        
        // Cek apakah ada argumen
        if (args.length === 0) {
            await bot.sendMessage(chatId, '⚠️ Silakan berikan argumen!\n\nContoh: `.template halo`');
            return;
        }
        
        // Ambil argumen
        const userInput = args.join(' ');
        
        // Kirim pesan sederhana
        await bot.sendMessage(chatId, `Halo ${userName}! Anda mengirim: ${userInput}`);
        
        // Atau kirim dengan formatting
        const formattedMessage = `
*Template Plugin*

👤 User: ${userName}
💬 Input: \`${userInput}\`
🆔 User ID: ${userId}

_Ini adalah template plugin_
        `.trim();
        
        await bot.sendMessage(chatId, formattedMessage, {
            parse_mode: 'Markdown'
        });
        
        // Atau kirim dengan inline keyboard
        /*
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Yes', callback_data: 'template:yes' },
                        { text: '❌ No', callback_data: 'template:no' }
                    ],
                    [
                        { text: '🔙 Back', callback_data: 'menu:show' }
                    ]
                ]
            }
        };
        
        await bot.sendMessage(chatId, 'Pilih opsi:', options);
        */
    },
    
    // Handler untuk callback query / inline keyboard (OPTIONAL)
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        const param = parts[2]; // Jika ada parameter tambahan
        
        // Handle berbagai action
        if (action === 'yes') {
            await bot.answerCallbackQuery(query.id, {
                text: '✅ You clicked Yes!',
                show_alert: false
            });
            
            // Edit message setelah button diklik (OPTIONAL)
            await bot.editMessageText('Anda memilih: Yes', {
                chat_id: query.message.chat.id,
                message_id: query.message.message_id
            });
            
        } else if (action === 'no') {
            await bot.answerCallbackQuery(query.id, {
                text: '❌ You clicked No',
                show_alert: true // show_alert: true akan menampilkan popup
            });
            
        } else if (action === 'show') {
            // Re-trigger execute function
            await this.execute(bot, query.message, []);
            await bot.answerCallbackQuery(query.id);
        }
    }
    
    // Anda bisa menambahkan helper functions
    /*
    ,
    
    helperFunction(input) {
        // Helper logic here
        return input.toUpperCase();
    },
    
    async anotherHelper(bot, chatId) {
        await bot.sendMessage(chatId, 'Helper message');
    }
    */
};

/**
 * CATATAN PENTING:
 * 
 * 1. Property 'name' dan 'execute' adalah WAJIB
 * 2. Callback data format: 'pluginName:action:param'
 * 3. Selalu gunakan try-catch untuk error handling
 * 4. Selalu answer callback query untuk menghilangkan loading state
 * 5. Gunakan parse_mode: 'Markdown' untuk formatting
 * 6. Test plugin dengan .reload setelah membuat perubahan
 * 
 * MARKDOWN FORMATTING:
 * - *bold*
 * - _italic_
 * - `code`
 * - ```code block```
 * - [link](http://example.com)
 * 
 * EMOJI TIPS:
 * Copy emoji dari: https://emojipedia.org/
 * Contoh: ✅ ❌ ⚠️ 📝 🎮 🔥 💡 📊 🎯 🚀
 */
