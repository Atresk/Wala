const { InteractionType, EmbedBuilder, Events } = require('discord.js');


module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.type !== InteractionType.ModalSubmit && interaction.customId != 'addon回報表單') return;
		if (interaction.customId === 'addon回報表單') {
			const channel = interaction.client.channels.cache.get('1004786991021441084');
			const Embed = new EmbedBuilder()
				.setColor('Yellow')
				.addFields({ name: '意見回報內容', value: `回報用戶: ${interaction.user}\n類型: ${interaction.fields.getTextInputValue('類型')}\n描述: ${interaction.fields.getTextInputValue('描述')}` })
				.setTimestamp()
			channel.send({ embeds: [Embed] });
			await interaction.reply({ content: '已收到您提交的回覆', ephemeral: true });
		}
	},
};