const Discord = require('discord.js')
const rhex = require('random-hex-color')
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
			.setColor(rhex())
			.setFooter('Requested by ' + message.author.tag, message.author.avatarURL())
			
		message.channel.send(embed)
	},
	help : 'Displays a list of all commands.'
}
