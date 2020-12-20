const Discord = require('discord.js') 
let list = ''
let embed = ''

module.exports = {
	name : 'help',
	run : (client, message, args) => {
		client.commands.forEach(cmd => {
			list += '❯ `' + cmd.name + '` – '+ cmd.help + `\n`
		})
		embed = new Discord.MessageEmbed()
			.setAuthor('Displaying help', client.user.avatarURL())
			.setDescription(list)
			.setColor('RANDOM')
			.setFooter('Requested by ' + message.author.tag, message.author.avatarURL())
		list = ''
		message.channel.send(embed)
	},
	help : 'Displays a list of all commands.'
}
