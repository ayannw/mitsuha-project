const Discord = require('discord.js')
const n_c = require('nekos.life')
const neko = new n_c()
const rhex = require('random-hex-color')
let img, _neko, embed
module.exports = {
  name: 'neko',
  run : async (client, message, args) => {
  	if(message.guild.id === '265828729970753537')
  		return message.channel.send('Command has been disabled for this server.')
  	_neko = await neko.sfw.neko()
  	img = _neko.url
  	embed = new Discord.MessageEmbed()
  		.setImage(img)
  		.setColor(rhex())
  		.setFooter('Powered by Nekos.life', 'https://avatars2.githubusercontent.com/u/34457007?s=200&v=4')
  		.setURL('https://nekos.life/')
  
  	message.channel.send(embed)
  },
  help : 'Loads a random neko image.'
}
