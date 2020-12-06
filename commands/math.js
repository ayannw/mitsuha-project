const Discord = require('discord.js')
const math = require('/data/data/com.termux/files/home/node_modules/mathjs')
let eTime, sTime, time, out, embed
exports.run = (client, message, args) => {
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
		
}
exports.help = 'Calculates provided mathmetical expression.'
