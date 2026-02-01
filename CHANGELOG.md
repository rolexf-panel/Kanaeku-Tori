# 📝 Changelog

All notable changes to Kanaeku Tori Bot will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-02-01

### 🐛 Fixed
- **CRITICAL:** Fixed Telegram Markdown parsing error in `/start` command
  - Changed invalid backtick syntax from `` `.', `` to `` `.`, ``
  - Error was: "can't parse entities: Can't find end of the entity starting at byte offset 402"
  
- **Circular Dependency Warnings:** Fixed all circular dependency warnings
  - Changed from top-level require to lazy loading in 6 plugins
  - Affected plugins: menu, help, info, reload, stats, and internal methods
  - No more "Accessing non-existent property" warnings

### 🔧 Changed
- `plugins/start.js` - Fixed Markdown syntax
- `plugins/menu.js` - Lazy loading in 3 methods (execute, showCategory, showAllCommands)
- `plugins/help.js` - Lazy loading in 2 methods (execute, findCommand)
- `plugins/info.js` - Lazy loading in execute method
- `plugins/reload.js` - Lazy loading in execute method
- `plugins/stats.js` - Lazy loading in execute method

### 📚 Added
- `BUGFIX.md` - Detailed documentation of bug fixes
- `CHANGELOG.md` - Version history tracking

---

## [1.0.0] - 2026-02-01

### 🎉 Initial Release

### ✨ Features
- **Modular Plugin System** - Easy to extend with new features
- **Hot Reload Support** - Reload plugins without restart
- **Interactive UI** - Inline keyboards and callback queries
- **Multiple Prefix Support** - `.`, `/`, and `liona` keywords
- **Admin System** - Admin-only commands with authorization
- **Category Organization** - Plugins organized by category

### 🔌 Built-in Plugins (11 total)

#### General Category
- `start` - Welcome message with navigation buttons
- `menu` - Interactive menu with categories
- `help` - Comprehensive help system
- `info` - Bot information and system stats

#### Utility Category
- `ping` - Latency checker
- `echo` - Message repeater
- `calc` - Simple calculator with expression support

#### Fun Category
- `quote` - Random inspirational quotes (with API integration)
- `dice` - Dice roller with custom notation (XdY format)

#### Admin Category
- `reload` - Hot reload all plugins (admin only)

#### Info Category
- `stats` - Bot usage statistics

### 📚 Documentation
- `README.md` - Comprehensive project documentation
- `QUICKSTART.md` - 5-minute setup guide
- `SETUP_GUIDE.md` - Detailed environment configuration guide
- `API.md` - Complete API reference for developers
- `CONTRIBUTING.md` - Contribution guidelines
- `NPM_SCRIPTS.md` - NPM commands documentation
- `PROJECT_SUMMARY.md` - Project overview

### 🛠️ Utilities
- `lib/logger.js` - Colored console logging with file support
- `lib/database.js` - Database utility template (ready for implementation)

### 📦 NPM Scripts
- `npm start` - Run in production mode
- `npm run dev` - Run with auto-reload (nodemon)
- `npm run setup` - Auto setup (install + create .env)
- `npm run check` - Validate configuration
- `npm run info` - Show bot information
- `npm run clean` - Clean node_modules
- `npm run reinstall` - Fresh install dependencies

### 🎨 Template Files
- `plugins/_template.js` - Plugin template for developers
- `.env.example` - Full environment configuration template
- `.env.template` - Simple quick-start template

### 🔧 Configuration
- Environment-based configuration (.env)
- Support for multiple admins
- Optional database support (MySQL, PostgreSQL, MongoDB, SQLite)
- Feature flags
- Logging configuration
- Debug mode

### 🎯 Architecture
- Main launcher with startup animation (`index.js`)
- Core system with command routing (`src/main.js`)
- Plugin directory for modular features (`plugins/`)
- Utility libraries (`lib/`)
- Data storage directory (`data/`)

---

## Version Format

- **Major.Minor.Patch** (Semantic Versioning)
  - **Major**: Breaking changes
  - **Minor**: New features (backward compatible)
  - **Patch**: Bug fixes (backward compatible)

---

## Upcoming Features

### Planned for v1.1.0
- [ ] Database integration (MySQL/MongoDB)
- [ ] User preferences system
- [ ] More interactive games
- [ ] Weather plugin
- [ ] Currency converter
- [ ] Reminder system

### Planned for v1.2.0
- [ ] Multi-language support
- [ ] Web dashboard
- [ ] Analytics system
- [ ] Rate limiting
- [ ] Spam protection

### Planned for v2.0.0
- [ ] Group management features
- [ ] Advanced admin panel
- [ ] Plugin marketplace
- [ ] API endpoints
- [ ] Cloud deployment templates

---

## Links

- **Repository:** https://github.com/yourusername/kanaeku-tori-bot
- **Documentation:** [README.md](README.md)
- **Issues:** https://github.com/yourusername/kanaeku-tori-bot/issues
- **Releases:** https://github.com/yourusername/kanaeku-tori-bot/releases

---

**Legend:**
- 🎉 Initial Release
- ✨ New Feature
- 🐛 Bug Fix
- 🔧 Changed
- 📚 Documentation
- 🗑️ Removed
- ⚠️ Deprecated
- 🔒 Security
