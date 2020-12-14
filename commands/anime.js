const Discord = require('discord.js')
const rhex = require('random-hex-color')
const fetch = require('node-fetch')
const baseURL = 'https://kitsu.io/api/edge/anime?filter[text]='
let embed, url, data, json, anime

module.exports = {
	name: 'anime',
	run : async (client, message, args) => {
		if(args.join(' ').startsWith(' ')) args[0] = ''
		if(!args) return message.channel.send('Please input an anime name.')

		if(args){
			try {
				args = encodeURI(args.join(' '))
				url = baseURL + args
				data = await fetch(url)
				json = await data.json()
			
				if(json.data.length == 0) return message.channel.send('Could not find the anime.')

				anime = json.data[0].attributes
				embed = new Discord.MessageEmbed()
					.setTitle(anime.titles.en_jp)
					.setThumbnail(anime.posterImage.large)
					.setDescription(`❯ **English Title:** ${anime.titles.en}
❯ **Canonical Title:** ${anime.canonicalTitle}
❯ **Japanese Title:** ${anime.titles.ja_jp}
❯ **Type:** ${anime.showType}
❯ **Age rating:** ${anime.ageRating}
❯ **Episodes:** ${anime.episodeCount}
❯ **Decription:** ${anime.description}
❯ **Average rating:** ${anime.averageRating}
❯ **Popularity rank:** ${anime.popularityRank}`)
					.setFooter('Powered by Kitsu', 'https://avatars0.githubusercontent.com/u/7648832?s=280&v=4')
					.setColor(rhex())
					.setURL('https://kitsu.io/anime/' + anime.slug)
			} catch {
				return message.channel.send('An unexpected error popped up!')
			}
			return message.channel.send(embed)
		}
	},
	help : 'Shows info about an anime.'
}