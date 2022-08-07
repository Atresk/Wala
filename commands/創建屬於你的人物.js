const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('創建屬於你的人物')
		.setType(ApplicationCommandType.User),
};