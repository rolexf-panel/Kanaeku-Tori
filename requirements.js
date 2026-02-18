/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║  🎌 KANAEKU TORI-BOT - REQUIREMENTS                           ║
 * ║  「金明く鳥ボット」- 必要事項                                   ║
 * ╚═══════════════════════════════════════════════════════════════╝
 */

module.exports = {
    // ═══════════════════════════════════════════════════════════
    // CORE DEPENDENCIES (Wajib)
    // ═══════════════════════════════════════════════════════════
    dependencies: {
        'node-telegram-bot-api': '^0.64.0',    // Core Telegram API
        'fs-extra': '^11.1.1',                  // File system utilities
        'path': '^0.12.7',                      // Path resolver
        'chalk': '^4.1.2',                      // Console colors
        'moment-timezone': '^0.5.43',           // Time formatting
        'axios': '^1.6.0',                      // HTTP requests
        'dotenv': '^16.3.1'                     // Environment variables
    },

    // ═══════════════════════════════════════════════════════════
    // OPTIONAL API DEPENDENCIES (Tambahkan jika diperlukan)
    // ═══════════════════════════════════════════════════════════
    optionalDependencies: {
        // Weather API
        'weather-api': 'untuk plugin weather',
        
        // Translation
        'google-translate-api-x': 'untuk plugin translate',
        
        // Anime/Waifu
        'waifu-im': 'untuk plugin waifu',
        
        // Database (pilih salah satu)
        'mongoose': 'MongoDB database',
        'sequelize': 'SQL database',
        'lowdb': 'JSON database (recommended untuk starter)'
    },

    // ═══════════════════════════════════════════════════════════
    // SYSTEM REQUIREMENTS
    // ═══════════════════════════════════════════════════════════
    system: {
        nodeVersion: '>=16.0.0',
        memory: '512MB minimum',
        disk: '100MB free space'
    },

    // ═══════════════════════════════════════════════════════════
    // API CONFIGURATION TEMPLATE
    // ═══════════════════════════════════════════════════════════
    apiTemplate: {
        telegram: {
            botToken: 'YOUR_BOT_TOKEN_HERE',
            username: 'KanaekuToriBot'
        },
        weather: {
            apiKey: 'YOUR_OPENWEATHER_API_KEY',
            defaultCity: 'Tokyo'
        },
        waifu: {
            apiKey: 'OPTIONAL_WAIFU_IM_KEY'
        },
        translate: {
            apiKey: 'OPTIONAL_GOOGLE_CLOUD_KEY'
        },
        database: {
            type: 'json', // 'json', 'mongodb', 'mysql'
            uri: './database/users.json'
        }
    },

    // ═══════════════════════════════════════════════════════════
    // BOT METADATA
    // ═══════════════════════════════════════════════════════════
    metadata: {
        name: 'Kanaeku Tori-Bot',
        japaneseName: '金明く鳥ボット',
        version: '1.0.0',
        author: 'Your Name',
        description: 'A modular Telegram bot with Japanese aesthetic',
        theme: {
            primary: '#FF6B9D',    // Sakura Pink
            secondary: '#4ECDC4',  // Torii Teal
            accent: '#FFE66D',     // Gold
            dark: '#2C3E50'        // Midnight
        }
    }
};
