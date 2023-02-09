const fs = require('node:fs');
const path = require('node:path');
const dotenv = require('dotenv'); 
dotenv.config();
const { REST, Routes } = require('discord.js');
const prompt = require('prompt-sync')();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

let cmdboolean = prompt('是否部屬為全局命令: ');
if(cmdboolean == 'y') {
	rest.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
	.then(() => console.log('bibo! bibo! 全局命令已註冊!'))
	.catch(console.error);
}
else if(cmdboolean == 'n'){
	rest.put(Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID), { body: commands })
	.then(() => console.log('bibo! bibo! 公會命令已註冊!'))
	.catch(console.error);
}

let ID = 0;
let delcommand = prompt('是否刪除命令: ');
if(delcommand == 'y') {
	delcommand = prompt('是否為全局命令: ');
	if(delcommand == 'y') {
		ID = prompt('ID: ');
		rest.delete(Routes.applicationCommand(process.env.CLIENTID, `${ID}`))
		.then(() => console.log(`${ID}全局命令已刪除!`))
		.catch(console.error);
	}
	else if(delcommand == 'n'){
		ID = prompt('ID: ');
		rest.delete(Routes.applicationGuildCommand(process.env.CLIENTID, process.env.GUILDID, `${ID}`))
		.then(() => console.log(`${ID}公會命令已刪除!`))
		.catch(console.error);
	}
}


