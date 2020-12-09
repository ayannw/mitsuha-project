const Discord = require('discord.js')
const rhex = require('random-hex-color')
let user, embed
embed = new Discord.MessageEmbed()
			.setColor(rhex())

module.exports = {
  name : 'avatar',
  run : (client, message, args) => {
  	user = message.author
	  if(message.mentions.users.size > 0){
	  	user = message.mentions.users.first()
  	}
  	embed = new Discord.MessageEmbed()
			.setTitle(user.tag)
			.setImage(user.avatarURL({ dynamic: true, size: 2048 }))
			.setColor(rhex())
			.setTimestamp()
  	message.channel.send(embed)
  },
  help : 'Display someone\'s avatar.'
}
