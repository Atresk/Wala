const dotenv = require('dotenv');
dotenv.config();
const { AuditLogEvent, Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberRemove,
	async execute(member) {
		const fetchedLogs = await member.guild.fetchAuditLogs({
			limit: 1,
			type: AuditLogEvent.MemberKick,
		});
		const kickLog = fetchedLogs.entries.first();

		if (!kickLog) return console.log(`${member.user.tag} left the guild, most likely of their own will.`);

		const { executor, target } = kickLog;

		if (target.id === member.id) {
			await member.client.channels.cache.get('980356156604182538').send(`${member.user}被${executor}踢出了伺服器`);
		} else {
			await member.client.channels.cache.get('980356156604182538').send(`${member.user}離開了伺服器`);
		}
		const guildId = member.client.guilds.cache.get(process.env.GUILDID);
		await member.client.channels.cache.get(process.env.TOTELID).setName(`伺服器總人數: ${guildId.memberCount}`);
	},
};