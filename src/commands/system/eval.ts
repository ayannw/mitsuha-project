import { owner, prefix } from '../../config';
import { Client, Message } from 'discord.js';
import { inspect } from 'util';
import { version } from 'process';
import { version as dV } from 'discord.js';
import { info } from '@ayanthedev/colorlogs';
import { Command } from '../../types/Command';

export const cmd: Command = {
	name: 'eval',
	run: (client: Client, message: Message, args: string[]) => {
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

		let m: string = '```js\nDiscord.js version: '
			+ dV + '\nNode.js version: '
			+ version + '\n\n— Output: \n\n'
			+ output + '\n\n— Done in '
			+ String(eTime - sTime) + 'ms```';
		if(output.length > 2000) {
			m = 'Output too long.';
		};

		return message.channel.send(m);
	},
	aliases: ['ev'],
	ownerOnly: true
};
