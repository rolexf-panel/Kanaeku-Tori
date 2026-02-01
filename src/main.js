const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// Initialize bot
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Collections
const commands = new Map();
const aliases = new Map();
const categories = new Map();

// Configuration
const config = {
    prefix: ['.', '/', 'liona'],
    botName: process.env.BOT_NAME || 'Kanaeku Tori',
    adminId: process.env.ADMIN_ID ? parseInt(process.env.ADMIN_ID) : null
};

// Load plugins
function loadPlugins() {
    const pluginsPath = path.join(__dirname, '../plugins');
    const pluginFiles = fs.readdirSync(pluginsPath).filter(file => file.endsWith('.js'));
    
    let loadedCount = 0;
    
    for (const file of pluginFiles) {
        try {
            const filePath = path.join(pluginsPath, file);
            delete require.cache[require.resolve(filePath)]; // Enable hot reload
            
            const plugin = require(filePath);
            
            // Validate plugin structure
            if (!plugin.name || typeof plugin.execute !== 'function') {
                console.warn(`\x1b[33m[WARNING]\x1b[0m Plugin ${file} is missing required properties`);
                continue;
            }
            
            // Register command
            commands.set(plugin.name, plugin);
            
            // Register aliases
            if (plugin.aliases && Array.isArray(plugin.aliases)) {
                plugin.aliases.forEach(alias => {
                    aliases.set(alias, plugin.name);
                });
            }
            
            // Register category
            const category = plugin.category || 'general';
            if (!categories.has(category)) {
                categories.set(category, []);
            }
            categories.get(category).push(plugin.name);
            
            loadedCount++;
            console.log(`\x1b[32m[LOADED]\x1b[0m ${plugin.name} (${file})`);
            
        } catch (error) {
            console.error(`\x1b[31m[ERROR]\x1b[0m Failed to load ${file}:`, error.message);
        }
    }
    
    console.log(`\x1b[36m[INFO]\x1b[0m Successfully loaded ${loadedCount} plugins\n`);
}

// Parse message to extract command and arguments
function parseMessage(text) {
    text = text.trim();
    
    // Check for prefix
    let usedPrefix = null;
    for (const prefix of config.prefix) {
        if (text.toLowerCase().startsWith(prefix.toLowerCase())) {
            usedPrefix = prefix;
            text = text.slice(prefix.length).trim();
            break;
        }
    }
    
    if (!usedPrefix) return null;
    
    // Split command and arguments
    const args = text.split(/\s+/);
    const commandName = args.shift().toLowerCase();
    
    return { commandName, args };
}

// Get plugin by name or alias
function getPlugin(name) {
    if (commands.has(name)) {
        return commands.get(name);
    }
    if (aliases.has(name)) {
        const realName = aliases.get(name);
        return commands.get(realName);
    }
    return null;
}

// Message handler
bot.on('message', async (msg) => {
    try {
        const chatId = msg.chat.id;
        const text = msg.text || '';
        
        // Ignore non-text messages for command processing
        if (!text) return;
        
        // Parse message
        const parsed = parseMessage(text);
        if (!parsed) return;
        
        const { commandName, args } = parsed;
        
        // Get plugin
        const plugin = getPlugin(commandName);
        if (!plugin) {
            // Command not found - optionally send a message
            return;
        }
        
        // Log command usage
        const username = msg.from.username || msg.from.first_name || 'Unknown';
        console.log(`\x1b[34m[COMMAND]\x1b[0m ${username} (${msg.from.id}) used: ${commandName} ${args.join(' ')}`);
        
        // Execute plugin
        await plugin.execute(bot, msg, args);
        
    } catch (error) {
        console.error('\x1b[31m[ERROR]\x1b[0m Message handler error:', error);
        
        // Send error message to user
        try {
            await bot.sendMessage(msg.chat.id, '❌ Terjadi kesalahan saat memproses perintah Anda.');
        } catch (sendError) {
            console.error('\x1b[31m[ERROR]\x1b[0m Failed to send error message:', sendError);
        }
    }
});

// Callback query handler (for inline keyboards)
bot.on('callback_query', async (query) => {
    try {
        const data = query.data;
        
        // Parse callback data (format: pluginName:action:params)
        const parts = data.split(':');
        const pluginName = parts[0];
        
        // Get plugin
        const plugin = getPlugin(pluginName);
        
        if (plugin && typeof plugin.handleCallback === 'function') {
            // Log callback usage
            const username = query.from.username || query.from.first_name || 'Unknown';
            console.log(`\x1b[35m[CALLBACK]\x1b[0m ${username} (${query.from.id}) triggered: ${data}`);
            
            // Execute callback handler
            await plugin.handleCallback(bot, query);
        } else {
            // Answer callback to remove loading state
            await bot.answerCallbackQuery(query.id, {
                text: '⚠️ Handler tidak ditemukan',
                show_alert: false
            });
        }
        
    } catch (error) {
        console.error('\x1b[31m[ERROR]\x1b[0m Callback handler error:', error);
        
        // Answer callback with error
        try {
            await bot.answerCallbackQuery(query.id, {
                text: '❌ Terjadi kesalahan',
                show_alert: true
            });
        } catch (answerError) {
            console.error('\x1b[31m[ERROR]\x1b[0m Failed to answer callback:', answerError);
        }
    }
});

// Polling error handler
bot.on('polling_error', (error) => {
    console.error('\x1b[31m[POLLING ERROR]\x1b[0m', error.message);
});

// Load all plugins on startup
loadPlugins();

// Export for use in plugins
module.exports = {
    bot,
    commands,
    aliases,
    categories,
    config,
    loadPlugins
};

console.log(`\x1b[32m[SUCCESS]\x1b[0m Bot is now running as @${config.botName}`);
console.log(`\x1b[36m[INFO]\x1b[0m Listening for commands with prefix: ${config.prefix.join(', ')}\n`);
