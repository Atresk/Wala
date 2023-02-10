const { EmbedBuilder, Events } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member) {
		const Embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(`歡迎${member.user}`)
			.setImage(member.user.displayAvatarURL())
			.setTimestamp();

		await member.client.channels.cache.get('980356156604182538').send({ embeds: [Embed] });
		const guildId = member.client.guilds.cache.get(process.env.GUILDID);
		await member.client.channels.cache.get(process.env.TOTELID).setName(`伺服器總人數: ${guildId.memberCount}`);
	},
};