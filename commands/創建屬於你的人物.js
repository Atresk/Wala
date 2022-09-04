const { ContextMenuCommandBuilder, ApplicationCommandType, ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('創建屬於你的人物')
		.setType(ApplicationCommandType.User),
	async execute(interaction) {
		const 選擇菜單 = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('創角')
					.setPlaceholder('由此開始創建你的角色')
					.setDisabled(false)
					.addOptions(
						// 最多25個選項
						{
							label: '種族',
							description: '選擇角色的種族(人族、精靈等)',
							value: '1',

						},
						{
							label: '主要職業',
							description: '選擇主要職業(戰士、牧師等)',
							value: '2',
						},
						{
							label: '副職業',
							description: '選擇副職業(農夫、礦工等)',
							value: '3',
						},
						{
							label: '陣營',
							description: '決定你角色性格的重要因素',
							value: '4',
						},
						{
							label: '語言',
							description: '選擇你角色學習的語言',
							value: '5',
						},
						{
							label: '天賦',
							description: '選擇角色與生俱來的特殊能力',
							value: '6',
						},
						{
							label: '信仰',
							description: '選擇角色的信仰',
							value: '7',
						},
					),
			);

		const 嵌入 = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('標題')
			.setURL('https://discord.js.org/')
			.setAuthor({ name: '嵌入名', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
			.setDescription('敘述')
			.setThumbnail('https://i.imgur.com/AfFp7pu.png')
			.addFields(
				{ name: '小標', value: '值' },
				{ name: '\u200B', value: '\u200B' },
				{ name: '小標', value: '值', inline: true },
				{ name: '小標', value: '值', inline: true },
			)
			.addFields({ name: '標', value: '值', inline: true })
			.setImage('https://i.imgur.com/AfFp7pu.png')
			.setTimestamp()
			.setFooter({ text: '底部文字', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


		await interaction.reply({ content: '請查看您與Wala的私人訊息，若無任何交互訊息發出，請至Wala個人主頁的"關於我"查看如何解決問題', ephemeral: true });
		await interaction.user.send({ embeds: [嵌入], components: [選擇菜單] })
			.catch(e => {
				console.log(`無法DM${interaction.user.name}${interaction.user.id}, error:\n${e}`);
			});
	},
};