const Discord = require('discord.js')
const dVersion = Discord.version
const rhex = require('random-hex-color')
let embed
exports.run = (client, message, args) => {
	embed = new Discord.MessageEmbed()
		.setTitle('• Statistics')
		.setDescription(`❯ Users: ${client.users.cache.size}
❯ Guilds: ${client.guilds.cache.size}
❯ Discord.js: ${dVersion}
❯ Node.js: ${process.version}
❯ RAM used: ${client.stats.memory.used.str + '(' +  client.stats.memory.used.percent + ')'}
❯ Total RAM: ${client.stats.memory.total}`)
		.setColor(rhex())

	return message.channel.send(embed)
}
