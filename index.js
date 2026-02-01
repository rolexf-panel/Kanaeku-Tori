const { version } = require('./package.json');
require('dotenv').config();

// ASCII Art Banner
const banner = `
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║    ██╗  ██╗ █████╗ ███╗   ██╗ █████╗ ███████╗██╗  ██╗██╗ ║
║    ██║ ██╔╝██╔══██╗████╗  ██║██╔══██╗██╔════╝██║ ██╔╝██║ ║
║    █████╔╝ ███████║██╔██╗ ██║███████║█████╗  █████╔╝ ██║ ║
║    ██╔═██╗ ██╔══██║██║╚██╗██║██╔══██║██╔══╝  ██╔═██╗ ██║ ║
║    ██║  ██╗██║  ██║██║ ╚████║██║  ██║███████╗██║  ██╗██║ ║
║    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝ ║
║                                                           ║
║              🦅 TORI - Telegram Bot Framework 🦅          ║
║                    Version ${version.padEnd(27)} ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
`;

// Startup animation
function startupAnimation() {
    return new Promise((resolve) => {
        console.clear();
        console.log('\x1b[36m%s\x1b[0m', banner);
        
        const steps = [
            '🔍 Checking environment variables...',
            '📦 Loading dependencies...',
            '🔌 Initializing plugins...',
            '🌐 Connecting to Telegram API...',
            '✅ Bot is ready!'
        ];
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < steps.length) {
                console.log(`\x1b[33m[${new Date().toLocaleTimeString()}]\x1b[0m ${steps[index]}`);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(resolve, 500);
            }
        }, 500);
    });
}

// Check for updates (placeholder)
async function checkUpdates() {
    console.log('\x1b[35m[INFO]\x1b[0m Checking for updates...');
    // Implement your update checking logic here
    console.log('\x1b[32m[INFO]\x1b[0m You are running the latest version!\n');
}

// Main initialization
async function init() {
    try {
        await startupAnimation();
        await checkUpdates();
        
        // Check required environment variables
        if (!process.env.BOT_TOKEN) {
            throw new Error('BOT_TOKEN is not defined in .env file!');
        }
        
        // Start the bot
        require('./src/main');
        
    } catch (error) {
        console.error('\x1b[31m[ERROR]\x1b[0m Failed to start bot:', error.message);
        process.exit(1);
    }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\x1b[33m[INFO]\x1b[0m Shutting down bot gracefully...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\n\x1b[33m[INFO]\x1b[0m Shutting down bot gracefully...');
    process.exit(0);
});

// Start the application
init();
