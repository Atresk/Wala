const { 
	ContextMenuCommandBuilder, 
	ApplicationCommandType, 
	ActionRowBuilder, 
	ModalBuilder, 
	TextInputBuilder, 
	TextInputStyle 
} = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('addon意見')
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		const addon_modal = new ModalBuilder()
			.setCustomId('addon回報表單')
			.setTitle('addon回報表單');

		const 類型 = new TextInputBuilder()
			.setCustomId('類型')
			.setLabel('類型 (像是音效方面還是物品方面都可以 最大輸入字數15)')
			.setMaxLength(15)
			.setStyle(TextInputStyle.Short);

		const 描述 = new TextInputBuilder()
			.setCustomId('描述')
			.setLabel('描述')
			.setStyle(TextInputStyle.Paragraph);

		const first = new ActionRowBuilder().addComponents(類型);
		const second = new ActionRowBuilder().addComponents(描述);

		addon_modal.addComponents(first, second);

		await interaction.showModal(addon_modal);
	},
};