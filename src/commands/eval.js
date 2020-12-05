const Discord = require('discord.js')
let code,sTime, eTime, embed
exports.run = (client, message, args) => {
	code = message.content.replace('m.eval', '')
	sTime = Date.now()
	try {
		code = eval(code)
	} catch(err) {
		return message.channel.send('An error occured :' + '```\n' + err + '```')
	}
	eTime = Date.now()

	time = `${eTime - sTime}ms`
	embed = new Discord.MessageEmbed()
		.addField('Output : ', '```\n'  + code + '```')
		.addField('_ _', '```' + '⏱ time taken: ' + time + '```')

	return message.channel.send(embed)
}
