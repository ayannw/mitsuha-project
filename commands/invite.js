const Discord = require('discord.js')
const rhex = require('random-hex-color')
const { invite_url } = require('../config.json')
let embed 
module.exports = {
	name : 'invite',
	run : (client, message, args) => {
		embed = new Discord.MessageEmbed()
			.setColor(rhex())
			.setDescription(`Use this link to invite me to your server :													
> ${invite_url}
Don't be afraid to uncheck some permissions, I will let you know if you're trying to run a command without permissions!`)	
		message.channel.send(embed)
	},
	help : 'Invite me to your server.'
}

