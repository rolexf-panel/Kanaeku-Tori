/**
 * 🎌 WEATHER PLUGIN - 天気
 */

const axios = require('axios');

class WeatherPlugin {
    constructor() {
        this.name = 'weather';
        this.description = 'Weather information';
    }

    init(bot) {
        this.config = require('../../config/config.js');
    }

    get commands() {
        return {
            weather: {
                description: 'Get weather info',
                execute: this.executeWeather.bind(this)
            }
        };
    }

    async executeWeather(ctx) {
        const { bot, chatId, args, banner } = ctx;
        
        const city = args.join(' ') || this.config.weather.defaultCity || 'Tokyo';
        
        try {
            const loading = await bot.sendMessage(chatId, `🌤️ Mencari cuaca untuk ${city}...`);
            
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: city,
                    appid: this.config.weather.apiKey,
                    units: this.config.weather.units,
                    lang: 'id'
                },
                timeout: 10000
            });
            
            await bot.deleteMessage(chatId, loading.message_id);
            
            const data = response.data;
            const weather = data.weather[0];
            const temp = Math.round(data.main.temp);
            const feelsLike = Math.round(data.main.feels_like);
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            
            const weatherEmojis = {
                'Clear': '☀️',
                'Clouds': '☁️',
                'Rain': '🌧️',
                'Drizzle': '🌦️',
                'Thunderstorm': '⛈️',
                'Snow': '🌨️',
                'Mist': '🌫️',
                'Fog': '🌫️'
            };
            
            const emoji = weatherEmojis[weather.main] || '🌡️';
            
            const text = `
╔════════════════════════════════════════╗
║     🌤️ WEATHER INFO - 天気情報         ║
╠════════════════════════════════════════╣
║                                        ║
║  📍 ${data.name}, ${data.sys.country}              ║
║                                        ║
║  ${emoji} ${weather.description.toUpperCase()}                    ║
║                                        ║
║  🌡️ Suhu: ${temp}°C (Terasa ${feelsLike}°C)          ║
║  💧 Kelembaban: ${humidity}%                    ║
║  💨 Angin: ${windSpeed} m/s                    ║
║  👁️ Visibility: ${(data.visibility / 1000).toFixed(1)} km                 ║
║                                        ║
╚════════════════════════════════════════╝
            `;
            
            const keyboard = ctx.utils.createInlineKeyboard([
                [
                    { text: '🔄 Refresh', callback_data: `weather:refresh:${city}` },
                    { text: '📍 Tokyo', callback_data: 'weather:refresh:Tokyo' }
                ]
            ]);
            
            await bot.sendPhoto(chatId, banner, {
                caption: text,
                parse_mode: 'HTML',
                ...keyboard
            });
            
        } catch (error) {
            let errorMsg = 'Gagal mengambil data cuaca.';
            if (error.response && error.response.status === 404) {
                errorMsg = 'Kota tidak ditemukan.';
            } else if (error.response && error.response.status === 401) {
                errorMsg = 'API Key tidak valid. Silakan cek konfigurasi.';
            }
            
            await bot.sendPhoto(chatId, banner, {
                caption: `
╔════════════════════════════════════════╗
║     ⚠️ ERROR - エラー                  ║
╠════════════════════════════════════════╣
║                                        ║
║  ${errorMsg}                           ║
║                                        ║
╚════════════════════════════════════════╝
                `,
                parse_mode: 'HTML'
            });
        }
    }

    get callbacks() {
        return {
            refresh: {
                execute: async (ctx) => {
                    const { bot, chatId, messageId, data } = ctx;
                    await bot.deleteMessage(chatId, messageId);
                    ctx.args = [data];
                    await this.executeWeather(ctx);
                }
            }
        };
    }
}

module.exports = WeatherPlugin;
