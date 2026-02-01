module.exports = {
    name: 'ping',
    aliases: ['p', 'latency'],
    category: 'utility',
    description: 'Mengecek kecepatan respons bot',
    
    async execute(bot, msg, args) {
        const chatId = msg.chat.id;
        const startTime = Date.now();
        
        // Send initial message
        const sentMsg = await bot.sendMessage(chatId, '🏓 Pinging...');
        
        // Calculate latency
        const endTime = Date.now();
        const latency = endTime - startTime;
        
        // Determine emoji based on latency
        let emoji = '🟢';
        let status = 'Excellent';
        
        if (latency > 500) {
            emoji = '🔴';
            status = 'Poor';
        } else if (latency > 200) {
            emoji = '🟡';
            status = 'Fair';
        }
        
        const responseText = `
${emoji} *Pong!*

⏱️ *Latency:* \`${latency}ms\`
📊 *Status:* ${status}
🤖 *Bot:* Online & Ready

_Response time measured from command to reply_
        `.trim();
        
        // Edit the message with results
        await bot.editMessageText(responseText, {
            chat_id: chatId,
            message_id: sentMsg.message_id,
            parse_mode: 'Markdown'
        });
    }
};
