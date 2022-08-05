const {
	Client,
	GatewayIntentBits,
	Collection,
	InteractionType,
	EmbedBuilder,
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv'); dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
client.event = new Collection();
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

// 表單回報處理
client.on('interactionCreate', async interaction => {
	if (interaction.type !== InteractionType.ModalSubmit) return;
	const channel = client.channels.cache.get('1004786991021441084');
	const Embed = new EmbedBuilder()
		.setColor('Yellow')
		.setAuthor({ name: '機器人問題回報通知' })
		.addFields({ name: '問題回報內容', value: `回報用戶:${interaction.user}\n頻道:${interaction.fields.getTextInputValue('channel0Input')}\n描述:${interaction.fields.getTextInputValue('problemInput')}` })
		.setTimestamp()
		.setFooter({ text: '來自𝐖𝐚𝐥𝐚的系統訊息' });
	channel.send({ embeds: [Embed] });
	if (interaction.customId === 'problemReport') {
		await interaction.reply({ content: '已收到您提交的回覆', ephemeral: true });
	}
});

client.login(process.env.TOKEN);
