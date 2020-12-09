const Discord = require('discord.js')
try {
  math = require('/data/data/com.termux/files/home/node_modules/mathjs')
} catch {
  math = require('mathjs')
}
let eTime, sTime, time, out, embed
module.exports = {
  name: 'math',
  run : (client, message, args) => {
  	out = args.join(' ')
  	sTime = Date.now()
  	try {
  		out = math.evaluate(out)
  	} catch (err) {
  		out = err
  	}
  	eTime = Date.now()
  	time = eTime - sTime
  
  	embed = new Discord.MessageEmbed()
  		.addField('Output : ', '```js\n'  + out + '```')
  		.addField('_ _', '`' + '⏱ time taken: ' + time + 'ms`')
  
  	message.channel.send(embed)
  		
  },
  help : 'Calculates provided mathmetical expression.'
}