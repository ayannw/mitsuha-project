const Discord = require('discord.js')
const dVersion = Discord.version
const rhex = require('random-hex-color')
let embed
module.exports = {
  name : 'stats',
  run : (client, message, args) => {
  	embed = new Discord.MessageEmbed()
  		.setTitle('• Statistics')
  		.setDescription(`❯ Users: ${client.users.cache.size}
❯ Guilds: ${client.guilds.cache.size}
❯ Discord.js: ${dVersion}
❯ Node.js: ${process.version}
❯ Memory used: ${client.stats.memory.used.str + '(' +  client.stats.memory.used.percent + ')'}
❯ Total memory: ${client.stats.memory.total}`)
  		.setColor(rhex())
  
  	return message.channel.send(embed)
  },
  help : 'My statistics.'
}
