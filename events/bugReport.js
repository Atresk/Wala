const { InteractionType, EmbedBuilder, Events } = require('discord.js');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.type !== InteractionType.ModalSubmit) return;
		const channel = interaction.client.channels.cache.get('1004786991021441084');
		const Embed = new EmbedBuilder()
			.setColor('Yellow')
			.setAuthor({ name: '機器人問題回報通知' })
			.addFields({ name: '問題回報內容', value: `回報用戶: ${interaction.user}\n類型: ${interaction.fields.getTextInputValue('問題類型')}\n頻道: ${interaction.fields.getTextInputValue('發生頻道')}\n描述: ${interaction.fields.getTextInputValue('問題描述')}` })
			.setTimestamp()
			.setFooter({ text: '來自𝐖𝐚𝐥𝐚的系統訊息' });
		channel.send({ embeds: [Embed] });
		if (interaction.customId === 'Bug回報表單') {
			await interaction.reply({ content: '已收到您提交的回覆', ephemeral: true });
		}
	},
};