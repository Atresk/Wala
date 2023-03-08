const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const translate = require('translate-google');

module.exports = {
	data: new ContextMenuCommandBuilder()
        .setName('翻譯 偵測語言譯中')
	    .setType(ApplicationCommandType.Message),
	async execute(interaction) {
        const A = translate(`${interaction.targetMessage.content}`, {to: 'zh-tw'}).then(res => {
            return res;
        }).catch(err => {
            console.error(err);
        })

        const printA = async () => {
            const B = await A;
            await interaction.reply({ content: `原始訊息: ${interaction.targetMessage.content}\n譯文: ${B}`, ephemeral: true });
        }
        
        printA();
	},
};


