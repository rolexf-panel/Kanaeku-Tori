/**
 * 🎌 PLUGIN LOADER - プラグインローダー
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

class PluginLoader {
    constructor(botInstance) {
        this.bot = botInstance;
        this.pluginsDir = path.join(__dirname, '..', 'plugins');
    }

    async loadAll() {
        const categories = await fs.readdir(this.pluginsDir);
        
        for (const category of categories) {
            const categoryPath = path.join(this.pluginsDir, category);
            const stat = await fs.stat(categoryPath);
            
            if (stat.isDirectory()) {
                await this.loadCategory(category, categoryPath);
            }
        }
    }

    async loadCategory(categoryName, categoryPath) {
        const files = await fs.readdir(categoryPath);
        
        for (const file of files) {
            if (file.endsWith('.js')) {
                const pluginPath = path.join(categoryPath, file);
                const pluginName = file.replace('.js', '');
                
                try {
                    delete require.cache[require.resolve(pluginPath)];
                    const PluginClass = require(pluginPath);
                    const plugin = new PluginClass();
                    
                    // Initialize plugin
                    if (plugin.init) {
                        await plugin.init(this.bot);
                    }
                    
                    this.bot.registerPlugin(`${categoryName}/${pluginName}`, plugin);
                    console.log(chalk.hex('#4ECDC4')(`  ✓ Loaded: ${categoryName}/${pluginName}`));
                    
                } catch (error) {
                    console.error(chalk.red(`  ✗ Failed to load ${categoryName}/${pluginName}:`), error.message);
                }
            }
        }
    }
}

module.exports = PluginLoader;
