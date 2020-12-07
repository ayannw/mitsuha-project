const fetch = require('node-fetch')
const url = 'https://api.nasa.gov/planetary/apod?api_key=paHo2yhgUV2jofm0W5kG4jb0nEPhE3mCKcfBrj5w'
const Discord = require('discord.js')
let data, json, embed

exports.run = async (client, message, args) => {
	data = await fetch(url)
	json = await data.json()
	embed = new Discord.MessageEmbed()
		.setTitle(json.title)
		.setDescription('> ' + json.explanation + '\n')
		.setImage(json.hdurl)
		.setFooter('©️  ' + json.copyright)
		.setColor('#005A89')

	message.channel.send(embed)
}
exports.help = 'NASA Astronomy Picture Of the Day !'
