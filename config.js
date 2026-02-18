/**
 * 🎌 KONFIGURASI BOT - 設定
 * Tambahkan API keys di sini
 */

module.exports = {
    telegram: {
        botToken: process.env.BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE',
        username: 'KanaekuToriBot',
        ownerId: 'YOUR_TELEGRAM_ID_HERE'  // Untuk perintah admin
    },

    // ═══════════════════════════════════════════════════════════
    // API KEYS - Tambahkan sesuai kebutuhan
    // ═══════════════════════════════════════════════════════════
    
    weather: {
        apiKey: process.env.WEATHER_API_KEY || 'YOUR_OPENWEATHER_API_KEY',
        defaultCity: 'Tokyo',
        units: 'metric'  // metric, imperial, kelvin
    },

    waifu: {
        // Waifu.im API (Free, no key required untuk basic usage)
        baseUrl: 'https://api.waifu.im',
        apiKey: process.env.WAIFU_API_KEY || null
    },

    animeQuote: {
        // Animechan API (Free)
        baseUrl: 'https://animechan.xyz/api'
    },

    translate: {
        // Google Cloud Translation (Optional, bisa pakai free tier)
        apiKey: process.env.TRANSLATE_API_KEY || null
    },

    database: {
        type: 'json',  // json, mongodb, mysql
        path: './database/users.json'
    },

    // ═══════════════════════════════════════════════════════════
    // BOT SETTINGS
    // ═══════════════════════════════════════════════════════════
    settings: {
        prefix: '/',
        language: 'id',  // id, en, jp
        timezone: 'Asia/Tokyo',
        maintenance: false,
        maxRequestsPerMinute: 30
    }
};
