import { commands } from '../handlers/command';
import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../types/Command';
import { embedItem } from '../tools/mitsuhaEmbed';

export const cmd: Command = {
	name: 'help',
	run: (client: Client, message: Message, args: Array<any>) => {
		let command: any;
		let embed: MessageEmbed = new MessageEmbed()
			.setColor('RANDOM')
			.setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL())
			.setTimestamp();
		let list: string[] = [];
		
		if(args[0]){
			if(!commands.get(args[0])){
				return message.channel.send(`Command \`${args[0]}\` not found`);
			};
			command = commands.get(args[0]);
			list.push(embedItem('Name', command.cmd.name));

			if(command.cmd.aliases) list.push(embedItem('Aliases', `\`${command.cmd.aliases.join(', ')}\``));
			if(command.cmd.help) list.push(embedItem('Description', command.cmd.help));
			if(!command.cmd.help) list.push(embedItem('Description', '_Command description  unavailable_'));

			embed
				.setAuthor('Command: ' + command.cmd.name, client.user.displayAvatarURL())
				.setDescription(list.join(''));
			return message.channel.send(embed);
			
		};
		commands.forEach(c => {
			if(c.cmd.ownerOnly) return;
			if(c.cmd.help){
				return list.push(embedItem(c.cmd.name, c.cmd.help));
			} else {
				return list.push(embedItem(c.cmd.name, '_Command description unavailable_'));
			};
		});
		
		embed
			.setAuthor('Displaying help', client.user.displayAvatarURL())
			.setDescription(list.join(''));

		return message.channel.send(embed);
	},
	help: 'A list of all commands',
	aliases: ['cmds', 'commandlist', 'cmdlist']
};
