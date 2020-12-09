const Discord = require('discord.js')
const rhex = require('random-hex-color')
let user, embed

module.exports = {
	name : 'whois',
	run : (client, message, args) => {
		if(message.mentions.users.size > 0){
			user = message.mentions.users[0]
		}
		
	}
}
