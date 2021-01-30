import fetch from 'node-fetch';
import { Command } from '../../types/Command';
import { Client, Message, MessageEmbed } from 'discord.js';
import { embedItem } from '../../tools/mitsuhaEmbed';

const baseurl = 'https://kitsu.io/api/edge/manga?filter[text]=';
const kitsuLogo = 'https://avatars1.githubusercontent.com/u/7648832?s=200&v=4';

export const cmd: Command = {
	name: 'manga',
	run: async (client: Client, message: Message, args: string[]) => {
		if(!args[0])  return message.channel.send('Please input a valid manga name.');
		const mangaName: string = encodeURI(args.join(' '));
		const sTime: number = new Date().getTime();
		let _list;
		let list;
		let msg: Message;

		message.channel.send('Loading ...').then((m) => { msg = m});
		try {
			_list = await fetch(baseurl + mangaName);
			list = await _list.json();
		} catch(err) {
			msg.delete();
			return message.channel.send('Error: ```js\n' + err + '```');
		}
		if(!list.data[0]){
			msg.delete();
			return message.channel.send('Could not find the manga.');
		}
		const manga = list.data[0].attributes;
		const eTime: number = new Date().getTime();
		const time: string = String(eTime-sTime) + 'ms';
		
		const embed: MessageEmbed = new MessageEmbed()
			.setTitle(manga.canonicalTitle
				|| manga.titles.en
				|| manga.titles.en_jp
				|| manga.titles.ja_jp)
			.setURL('https://kitsu.io/manga/' + manga.slug)
			.setColor('RANDOM')
			.setDescription(
				embedItem('English title', manga.titles.en || 'None') +
				embedItem('Canonical title', manga.canonicalTitle || 'None') +
				embedItem('Japanese title', manga.titles.ja_jp || 'None') +
				embedItem('Popularity rank', manga.popularityRank) +
				embedItem('Average rating', manga.averageRating) +
				embedItem('Description', manga.sypnosis || manga.description) +
				embedItem('Age rating', manga.ageRating)
			)
			.setThumbnail(manga.posterImage.original)
			.setFooter('kitsu.io | ' + time, kitsuLogo);

		msg.delete();
		return message.channel.send(embed);
	},
  help: 'Search for your favorite manga !',
  usage: 'm.manga <manga name>'
};
