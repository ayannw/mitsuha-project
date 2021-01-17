import { owner, prefix, tscV } from '../config';
import { Client, Message, MessageEmbed } from 'discord.js';
import { inspect } from 'util';
import { version } from 'process';
import { version as dV } from 'discord.js';
import { info } from 'colorlogs';

export const cmd = {
	name: 'eval',
	run: (client: Client, message: Message, args: Array<string>) => {
		if(String(message.author.id) != owner){
			return message.channel.send('You don\'t own me.');
		};
		let code: string;

		if(message.content.startsWith(prefix+'ev')){
			code = message.content.split(prefix+'ev')[1];
		};
		if(message.content.startsWith(prefix+'eval')){
			code = message.content.split(prefix+'eval')[1];
		};
		
		const sTime: number = new Date().getTime();
		let output: any;

		try {
			output = inspect(eval(code));
		} catch (err) {
			output = err;
		};

		info(output);
		
		const eTime: number = new Date().getTime();

		let m: string = '```ts\n// Discord.js version: '
			+ dV + '\n// Node.js version: '
			+ version + '\n// Typescript version: '
			+ tscV + '\n\n//— Output: \n\n'
			+ output + '\n\n//— Done in '
			+ String(eTime - sTime) + 'ms```';
		if(output.length > 2000) {
			m = 'Output too long.';
		};

		return message.channel.send(m);
	},
	alias: 'ev',
	ownerOnly: true
};
