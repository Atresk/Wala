const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv'); dotenv.config();


const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('𝐖𝐚𝐥𝐚當前的ping值'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: commands })
	.then(() => console.log('bibo! bibo! 應用程式命令已同步!'))
	.catch(console.error);