const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isSelectMenu()) return;
		if (interaction.customId === '創角') {
			if (interaction.values == '1') {
				const 選擇菜單 = new ActionRowBuilder()
					.addComponents(
						new SelectMenuBuilder()
							.setCustomId('種族')
							.setPlaceholder('由此選擇你的角色種族')
							.setDisabled(false)
							.addOptions(
							// 最多25個選項
								{
									label: '人族',
									description: '亞種: 野蠻人, 半身人',
									value: '1-1',

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

				await interaction.reply({ embeds: [嵌入], components: [選擇菜單] });
			}
		}
	},
};