/**
 * Logger Utility
 * 
 * Provides colored console logging with timestamps
 */

const fs = require('fs');
const path = require('path');

class Logger {
    constructor() {
        this.logFile = path.join(__dirname, '../data/bot.log');
        this.logToFile = process.env.LOG_TO_FILE === 'true';
        
        // Create data directory if it doesn't exist
        const dataDir = path.dirname(this.logFile);
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
    }
    
    /**
     * Get current timestamp
     */
    getTimestamp() {
        return new Date().toISOString();
    }
    
    /**
     * Write to log file
     */
    writeToFile(level, message) {
        if (!this.logToFile) return;
        
        const logEntry = `[${this.getTimestamp()}] [${level}] ${message}\n`;
        fs.appendFileSync(this.logFile, logEntry);
    }
    
    /**
     * Info log
     */
    info(message) {
        console.log(`\x1b[36m[INFO]\x1b[0m ${message}`);
        this.writeToFile('INFO', message);
    }
    
    /**
     * Success log
     */
    success(message) {
        console.log(`\x1b[32m[SUCCESS]\x1b[0m ${message}`);
        this.writeToFile('SUCCESS', message);
    }
    
    /**
     * Warning log
     */
    warn(message) {
        console.warn(`\x1b[33m[WARNING]\x1b[0m ${message}`);
        this.writeToFile('WARNING', message);
    }
    
    /**
     * Error log
     */
    error(message, error = null) {
        console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
        if (error) {
            console.error(error);
        }
        this.writeToFile('ERROR', `${message} ${error ? error.stack : ''}`);
    }
    
    /**
     * Debug log
     */
    debug(message) {
        if (process.env.DEBUG === 'true') {
            console.log(`\x1b[35m[DEBUG]\x1b[0m ${message}`);
            this.writeToFile('DEBUG', message);
        }
    }
    
    /**
     * Command log
     */
    command(user, command, args = []) {
        const message = `${user} used: ${command} ${args.join(' ')}`;
        console.log(`\x1b[34m[COMMAND]\x1b[0m ${message}`);
        this.writeToFile('COMMAND', message);
    }
}

module.exports = new Logger();
