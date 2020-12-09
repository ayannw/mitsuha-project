const Discord = require('discord.js')
const rhex = require('random-hex-color')
const os = require('os')
const filesize = require('humanize').filesize
let embed
module.exports = {
  name : 'system',
  run : (client, message, args) => {
  	embed = new Discord.MessageEmbed()
  		.setTitle('• System Information')
  		.setDescription(`❯ OS platform : ${os.platform()}
❯ OS type : ${os.type()}
❯ Total RAM : ${filesize(os.totalmem())}
❯ Used RAM : ${filesize(os.totalmem() - os.freemem())}
❯ Free RAM : ${filesize(os.freemem)}`)
  		.setColor(rhex())
  
  	return message.channel.send(embed)
  },
  help : 'System information of my server.'
}
