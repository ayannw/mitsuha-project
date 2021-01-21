import fetch from 'node-fetch';
import { Command } from '../typings/Command';
import { Client, Message, MessageEmbed } from 'discord.js';
import { embedItem } from '../tools/mitsuhaEmbed';

const baseurl: string = 'https://kitsu.io/api/edge/anime?filter[text]='
const kitsuLogo: string = 'https://avatars1.githubusercontent.com/u/7648832?s=200&v=4';

export const cmd: Command = {
	name: 'anime',
	run: async (client: Client, message: Message, args: Array<string>) => {
		if(!args[0])  return message.channel.send('Please input a valid anime name.');
		const animeName: string = encodeURI(args.join(' '));
		const sTime: number = new Date().getTime();
		let _list;
		let list;
		try {
			_list = await fetch(baseurl + animeName);
			list = await _list.json();
		} catch(err) {
			return message.channel.send('Error ' + err);
		};
		if(!list.data[0]) return message.channel.send('Could not find the anime.');
		const anime = list.data[0].attributes;
		const eTime: number = new Date().getTime();
		const time: string = String(eTime-sTime) + 'ms';
		let len: string;
		if(!anime.length) len = 'None';
		if(anime.length < 60) len = anime.length + ' min';
		if(anime.length > 60) len = String(anime.length/60).substring(0, 4) + ' hr';
		
		const embed: MessageEmbed = new MessageEmbed()
			.setTitle(anime.canonicalTitle
				|| anime.titles.english
				|| anime.titles.en_jp
				|| anime.titles.ja_jp)
			.setDescription(
				embedItem('English title', anime.titles.english || 'None') +
				embedItem('Canonical title', anime.canonicalTitle || 'None') +
				embedItem('Japanese title', anime.titles.ja_jp || 'None') +
				embedItem('Popularity rank', anime.popularityRank) +
				embedItem('Average rating', anime.averageRating) +
				embedItem('Description', anime.sypnosis || anime.description) +
				embedItem('Episodes', anime.episodeCount) +
				embedItem('Duration', len) +
				embedItem('Age rating', anime.ageRating)
			)
			.setThumbnail(anime.posterImage.original)
			.setFooter('kitsu.io | ' + time, kitsuLogo)
			
		return message.channel.send(embed);
	},
	help: 'Search for your favorite anime !'
};
