import { owner, prefix, tscV } from '../config';
import { Client, Message, MessageEmbed } from 'discord.js';
import { inspect } from 'util';
import { version } from 'process';
import { version as dV } from 'discord.js';

export const cmd = {
	name: 'eval',
	run: (client: Client, message: Message) => {
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
		
		const eTime: number = new Date().getTime();

		let m: string = '```ts\nDiscord.js version: '
			+ dV + '\nNode.js version: '
			+ version + '\nTypescript version: '
			+ tscV + '\n\n——Output: \n'
			+ output + '\n\ndone in '
			+ String(eTime - sTime) + 'ms```';
		if(output.length > 2000) {
			m = 'Output too long.';
		};

		return message.channel.send(m);
	},
	alias: 'ev'
};
