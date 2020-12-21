const Discord = require('discord.js') 
let user, embed

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
			.setColor('RANDOM')
			.setTimestamp()
  	message.channel.send(embed)
  },
  help : 'Display someone\'s avatar.'
}
