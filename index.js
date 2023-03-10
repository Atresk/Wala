const {
	Client,
	GatewayIntentBits,
	Collection,
} = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv');
dotenv.config();
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMembers, 
	GatewayIntentBits.GuildIntegrations, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.DirectMessages, 
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.MessageContent
] });

// 斜線命令處理
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// 事件處理
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


client.login(process.env.TOKEN);