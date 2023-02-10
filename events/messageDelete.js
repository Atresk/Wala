const { AuditLogEvent, EmbedBuilder, Events } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: Events.MessageDelete,
	async execute(message) {
        if(!message.guild) return;
        const channel = message.client.channels.cache.get('997048891721654312');
        
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: AuditLogEvent.MessageDelete,
        });
        const deletionLog = fetchedLogs.entries.first();
        
        const Embed2 = new EmbedBuilder()
			.setColor('Yellow')
            .setDescription(`原發送者: ${message.author}\n頻道: ${message.channel}\n 內容: ${message.content}`)
			.setTimestamp()
			.setFooter({ text: '訊息刪除' });

        if (!deletionLog) {
            channel.send({ embeds: [Embed2] });
        }
        else {
            const { executor, target } = deletionLog;

            const Embed = new EmbedBuilder()
		    	.setColor('Yellow')
                .setDescription(`刪除者: ${executor}\n原發送者: ${message.author}\n頻道: ${message.channel}\n 內容: ${message.content}`)
		    	.setTimestamp()
		    	.setFooter({ text: '訊息刪除' });

            if (target.id === message.author.id) {
                channel.send({ embeds: [Embed] });
            } else {
                channel.send({ embeds: [Embed2] });
            }
        }
	},
};