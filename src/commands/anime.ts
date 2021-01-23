import fetch from 'node-fetch';
import { Command } from '../types/Command';
import { Client, Message, MessageEmbed } from 'discord.js';
import { embedItem } from '../tools/mitsuhaEmbed';

const baseurl: string = 'https://kitsu.io/api/edge/anime?filter[text]=';
const kitsuLogo: string = 'https://avatars1.githubusercontent.com/u/7648832?s=200&v=4';

export const cmd: Command = {
	name: 'anime',
	run: async (client: Client, message: Message, args: string[]) => {
		if(!args[0])  return message.channel.send('Please input a valid anime name.');
		const animeName: string = encodeURI(args.join(' '));
		const sTime: number = new Date().getTime();
		let _list;
		let list;
		let msg: Message;

		message.channel.send('Loading ...').then((m) => { msg = m});
		try {
			_list = await fetch(baseurl + animeName);
			list = await _list.json();
		} catch(err) {
			msg.delete();
			return message.channel.send('Error: ```js\n' + err + '```');
		};
		if(!list.data[0]){
			msg.delete();
			return message.channel.send('Could not find the anime.');
		};
		const anime = list.data[0].attributes;
		const eTime: number = new Date().getTime();
		const time: string = String(eTime-sTime) + 'ms';
		let len: string;
		if(!anime.episodeLength) len = 'None';
		if(anime.episodeLength < 60) len = anime.episodeLength + ' min';
		if(anime.episodeLength > 60) len = String(anime.episodeLength/60).substring(0, 4) + ' hr';
		
		const embed: MessageEmbed = new MessageEmbed()
			.setTitle(anime.canonicalTitle
				|| anime.titles.en
				|| anime.titles.en_jp
				|| anime.titles.ja_jp)
			.setURL('https://kitsu.io/anime/' + anime.slug)
			.setColor('RANDOM')
			.setDescription(
				embedItem('English title', anime.titles.en || 'None') +
				embedItem('Canonical title', anime.canonicalTitle || 'None') +
				embedItem('Japanese title', anime.titles.ja_jp || 'None') +
				embedItem('Popularity rank', anime.popularityRank) +
				embedItem('Average rating', anime.averageRating) +
				embedItem('Description', anime.sypnosis || anime.description) +
				embedItem('Episodes', anime.episodeCount) +
				embedItem('Episode length', len) +
				embedItem('Age rating', anime.ageRating)
			)
			.setThumbnail(anime.posterImage.original)
			.setFooter('kitsu.io | ' + time, kitsuLogo);

		msg.delete();
		return message.channel.send(embed);
	},
	help: 'Search for your favorite anime !'
};
