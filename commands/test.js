const { SlashCommandBuilder } = require('discord.js');
const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('1')
		.setDescription('發送問題回報表單'),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('problemReport')
			.setTitle('機器人問題回報表單');

		const channel0Input = new TextInputBuilder()
			.setCustomId('channel0Input')
			.setLabel('問題發生頻道(如果無，則留空即可)')
			.setRequired(false)
			.setStyle(TextInputStyle.Short);

		const problemInput = new TextInputBuilder()
			.setCustomId('problemInput')
			.setLabel('發生什麼問題了(請清楚描述)')
			.setStyle(TextInputStyle.Paragraph);

		const firstActionRow = new ActionRowBuilder().addComponents(channel0Input);
		const secondActionRow = new ActionRowBuilder().addComponents(problemInput);

		modal.addComponents(firstActionRow, secondActionRow);

		await interaction.showModal(modal);
	},
};
