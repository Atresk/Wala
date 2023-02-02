const { Events } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		const guildId = client.guilds.cache.get(process.env.GUILDID);
		await client.channels.cache.get(process.env.TOTELID).setName(`伺服器總人數: ${guildId.memberCount}`);
	},
};