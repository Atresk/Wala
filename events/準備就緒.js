module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`bibo! bibo! 準備就緒! 登入帳戶${client.user.tag}!`);
	},
};