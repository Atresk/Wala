const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: 'guildMemberRemove',
	async execute(member) {
		await member.client.channels.cache.get('980356156604182538').send(`${member.user}離開了`);
		const guildId = member.client.guilds.cache.get(process.env.GUILDID);
		await member.client.channels.cache.get(process.env.TOTELID).setName(`伺服器總人數: ${guildId.memberCount}`);
	},
};