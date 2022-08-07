const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Bug回報')
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		const modal = new ModalBuilder()
			.setCustomId('Bug回報表單')
			.setTitle('Bug回報表單');

		const 問題類型 = new TextInputBuilder()
			.setCustomId('問題類型')
			.setLabel('問題類型 (指令問題填1|應用程式選項問題填2|其他問題填3')
			.setMaxLength(1)
			.setStyle(TextInputStyle.Short);

		const 發生頻道 = new TextInputBuilder()
			.setCustomId('發生頻道')
			.setLabel('問題發生頻道(如果無，則留空即可)')
			.setRequired(false)
			.setStyle(TextInputStyle.Short);

		const 問題描述 = new TextInputBuilder()
			.setCustomId('問題描述')
			.setLabel('問題描述')
			.setStyle(TextInputStyle.Paragraph);

		const firstActionRow = new ActionRowBuilder().addComponents(問題類型);
		const secondActionRow = new ActionRowBuilder().addComponents(發生頻道);
		const thirdActionRow = new ActionRowBuilder().addComponents(問題描述);

		modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

		await interaction.showModal(modal);
	},
};