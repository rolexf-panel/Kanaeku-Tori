const { commands, categories } = require('../src/main');

module.exports = {
    name: 'menu',
    aliases: ['m', 'commands'],
    category: 'general',
    description: 'Menampilkan menu utama bot',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        
        // Build category buttons
        const categoryButtons = [];
        const categoryArray = Array.from(categories.keys());
        
        for (let i = 0; i < categoryArray.length; i += 2) {
            const row = [];
            row.push({ 
                text: `📁 ${this.capitalizeFirst(categoryArray[i])}`, 
                callback_data: `menu:category:${categoryArray[i]}` 
            });
            
            if (i + 1 < categoryArray.length) {
                row.push({ 
                    text: `📁 ${this.capitalizeFirst(categoryArray[i + 1])}`, 
                    callback_data: `menu:category:${categoryArray[i + 1]}` 
                });
            }
            
            categoryButtons.push(row);
        }
        
        // Add additional buttons
        categoryButtons.push([
            { text: '📋 Semua Perintah', callback_data: 'menu:all' }
        ]);
        
        const menuText = `
🦅 *MENU UTAMA* 🦅

Pilih kategori untuk melihat perintah yang tersedia:

📊 Total Perintah: *${commands.size}*
📂 Total Kategori: *${categories.size}*

Klik tombol di bawah untuk melihat detail!
        `.trim();
        
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: categoryButtons
            }
        };
        
        await bot.sendMessage(chatId, menuText, options);
    },
    
    async handleCallback(bot, query) {
        const data = query.data;
        const parts = data.split(':');
        const action = parts[1];
        
        try {
            if (action === 'show') {
                // Re-send menu
                await this.execute(bot, query.message, []);
                await bot.answerCallbackQuery(query.id);
                
            } else if (action === 'category') {
                const category = parts[2];
                await this.showCategory(bot, query, category);
                
            } else if (action === 'all') {
                await this.showAllCommands(bot, query);
                
            } else if (action === 'back') {
                await this.execute(bot, query.message, []);
                await bot.answerCallbackQuery(query.id);
            }
            
        } catch (error) {
            console.error('Menu callback error:', error);
            await bot.answerCallbackQuery(query.id, {
                text: '❌ Terjadi kesalahan',
                show_alert: true
            });
        }
    },
    
    async showCategory(bot, query, category) {
        const commandList = categories.get(category);
        
        if (!commandList || commandList.length === 0) {
            await bot.answerCallbackQuery(query.id, {
                text: '⚠️ Kategori kosong',
                show_alert: true
            });
            return;
        }
        
        let text = `📁 *Kategori: ${this.capitalizeFirst(category)}*\n\n`;
        
        commandList.forEach(cmdName => {
            const cmd = commands.get(cmdName);
            const aliases = cmd.aliases && cmd.aliases.length > 0 
                ? ` (${cmd.aliases.join(', ')})` 
                : '';
            text += `• \`.${cmd.name}\`${aliases}\n  _${cmd.description}_\n\n`;
        });
        
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔙 Kembali', callback_data: 'menu:back' }]
                ]
            }
        };
        
        await bot.editMessageText(text, {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id,
            ...options
        });
        
        await bot.answerCallbackQuery(query.id);
    },
    
    async showAllCommands(bot, query) {
        let text = '📋 *SEMUA PERINTAH*\n\n';
        
        categories.forEach((commandList, category) => {
            text += `*${this.capitalizeFirst(category)}:*\n`;
            commandList.forEach(cmdName => {
                const cmd = commands.get(cmdName);
                text += `• \`.${cmd.name}\` - ${cmd.description}\n`;
            });
            text += '\n';
        });
        
        const options = {
            parse_mode: 'Markdown',
            reply_markup: {
                inline_keyboard: [
                    [{ text: '🔙 Kembali', callback_data: 'menu:back' }]
                ]
            }
        };
        
        await bot.editMessageText(text, {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id,
            ...options
        });
        
        await bot.answerCallbackQuery(query.id);
    },
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
};
