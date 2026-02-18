/**
 * ╔════════════════════════════════════════════════════════════════════╗
 * ║                                                                    ║
 * ║   🎌 金明く鳥ボット - KANAEKU TORI-BOT v1.0.0                      ║
 * ║   ═══════════════════════════════════════════════════════════      ║
 * ║   「鳥のように自由に、桜のように美しく」                           ║
 * ║   "Free as a bird, beautiful as cherry blossoms"                   ║
 * ║                                                                    ║
 * ╚════════════════════════════════════════════════════════════════════╝
 */

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const moment = require('moment-timezone');

// Load configuration
const config = require('./config/config.js');
const PluginLoader = require('./core/loader.js');
const Utils = require('./core/utils.js');

class KanaekuToriBot {
    constructor() {
        this.bot = null;
        this.plugins = new Map();
        this.commands = new Map();
        this.callbacks = new Map();
        this.stats = {
            startTime: Date.now(),
            messagesProcessed: 0,
            commandsExecuted: 0
        };
        
        // Banner image path (gunakan gambar dari assets)
        this.bannerPath = path.join(__dirname, 'assets', 'tori_banner.jpg');
        
        this.init();
    }

    async init() {
        console.log(chalk.hex('#FF6B9D')(`
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║     🌸 金明く鳥ボット - KANAEKU TORI-BOT 🌸                   ║
    ║                                                               ║
    ║     Version: 1.0.0  |  Theme: Japanese Aesthetic             ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
        `));

        try {
            await this.initializeBot();
            await this.loadPlugins();
            this.setupEventHandlers();
            this.setupErrorHandlers();
            
            console.log(chalk.green('\n✓ Bot berhasil dijalankan!'));
            console.log(chalk.cyan(`✓ Username: @${config.telegram.username}`));
            console.log(chalk.cyan(`✓ Start Time: ${moment().format('YYYY-MM-DD HH:mm:ss')}`));
            console.log(chalk.hex('#FFE66D')('\n═══════════════════════════════════════\n'));

        } catch (error) {
            console.error(chalk.red('✗ Gagal menjalankan bot:'), error);
            process.exit(1);
        }
    }

    async initializeBot() {
        this.bot = new TelegramBot(config.telegram.botToken, {
            polling: {
                interval: 300,
                autoStart: true,
                params: {
                    timeout: 10
                }
            },
            filepath: false
        });
    }

    async loadPlugins() {
        const loader = new PluginLoader(this);
        await loader.loadAll();
        console.log(chalk.green(`✓ Loaded ${this.plugins.size} plugins`));
        console.log(chalk.green(`✓ Registered ${this.commands.size} commands`));
    }

    setupEventHandlers() {
        // Handle text messages
        this.bot.on('message', async (msg) => {
            this.stats.messagesProcessed++;
            
            if (msg.text && msg.text.startsWith('/')) {
                await this.handleCommand(msg);
            }
        });

        // Handle callback queries (inline keyboard)
        this.bot.on('callback_query', async (query) => {
            await this.handleCallback(query);
        });

        // Handle new members
        this.bot.on('new_chat_members', async (msg) => {
            await this.handleNewMember(msg);
        });
    }

    async handleCommand(msg) {
        const text = msg.text;
        const chatId = msg.chat.id;
        const userId = msg.from.id;
        
        // Parse command
        const parts = text.split(' ');
        const commandName = parts[0].toLowerCase().replace('/', '').split('@')[0];
        const args = parts.slice(1);

        const command = this.commands.get(commandName);
        
        if (command) {
            try {
                this.stats.commandsExecuted++;
                
                // Execute command with context
                const context = {
                    bot: this.bot,
                    msg: msg,
                    chatId: chatId,
                    userId: userId,
                    args: args,
                    utils: Utils,
                    config: config,
                    banner: this.bannerPath,
                    stats: this.stats
                };

                await command.execute(context);
                
            } catch (error) {
                console.error(chalk.red(`Error executing command ${commandName}:`), error);
                await this.sendErrorMessage(chatId, 'Terjadi kesalahan saat menjalankan perintah.');
            }
        }
    }

    async handleCallback(query) {
        const data = query.data;
        const chatId = query.message.chat.id;
        const messageId = query.message.message_id;
        
        // Parse callback data (format: pluginName:action:data)
        const [pluginName, action, ...rest] = data.split(':');
        const callbackData = rest.join(':');

        const callback = this.callbacks.get(`${pluginName}:${action}`);
        
        if (callback) {
            try {
                const context = {
                    bot: this.bot,
                    query: query,
                    chatId: chatId,
                    messageId: messageId,
                    data: callbackData,
                    utils: Utils,
                    config: config
                };

                await callback.execute(context);
                await this.bot.answerCallbackQuery(query.id);
                
            } catch (error) {
                console.error(chalk.red('Callback error:'), error);
                await this.bot.answerCallbackQuery(query.id, {
                    text: '❌ Terjadi kesalahan',
                    show_alert: true
                });
            }
        }
    }

    async handleNewMember(msg) {
        const chatId = msg.chat.id;
        const newMembers = msg.new_chat_members;
        
        for (const member of newMembers) {
            if (member.is_bot) continue;
            
            const welcomeText = `
╔════════════════════════════════════╗
║     🌸 ようこそ! WELCOME! 🌸       ║
╠════════════════════════════════════╣
║                                    ║
║  Konnichiwa, ${member.first_name}!    ║
║                                    ║
║  Selamat datang di grup ini.       ║
║  Gunakan /help untuk melihat       ║
║  perintah yang tersedia.           ║
║                                    ║
╚════════════════════════════════════╝
            `;
            
            await this.bot.sendPhoto(chatId, this.bannerPath, {
                caption: welcomeText,
                parse_mode: 'HTML'
            });
        }
    }

    async sendErrorMessage(chatId, message) {
        const errorText = `
╔════════════════════════════════════╗
║     ⚠️ エラー ERROR ⚠️             ║
╠════════════════════════════════════╣
║                                    ║
║  ${message}                        ║
║                                    ║
║  Silakan coba lagi atau hubungi    ║
║  admin jika masalah berlanjut.     ║
║                                    ║
╚════════════════════════════════════╝
        `;
        
        await this.bot.sendPhoto(chatId, this.bannerPath, {
            caption: errorText,
            parse_mode: 'HTML'
        });
    }

    setupErrorHandlers() {
        process.on('unhandledRejection', (error) => {
            console.error(chalk.red('Unhandled Rejection:'), error);
        });

        process.on('uncaughtException', (error) => {
            console.error(chalk.red('Uncaught Exception:'), error);
            process.exit(1);
        });
    }

    // Method untuk register plugin (dipanggil oleh loader)
    registerPlugin(name, plugin) {
        this.plugins.set(name, plugin);
        
        // Register commands
        if (plugin.commands) {
            for (const [cmdName, cmdData] of Object.entries(plugin.commands)) {
                this.commands.set(cmdName, {
                    ...cmdData,
                    pluginName: name
                });
            }
        }
        
        // Register callbacks
        if (plugin.callbacks) {
            for (const [callbackName, callbackData] of Object.entries(plugin.callbacks)) {
                this.callbacks.set(`${name}:${callbackName}`, callbackData);
            }
        }
    }
}

// Start the bot
const bot = new KanaekuToriBot();

module.exports = bot;
