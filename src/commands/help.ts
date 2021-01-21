import { commands } from '../handlers/command';
import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../typings/Command';

export const cmd: Command = {
	name: 'help',
	run: (client: Client, message: Message, args: Array<any>) => {
		let list: Array<string> = [];
		
		commands.forEach(c => {
			if(c.cmd.ownerOnly) return;
			if(c.cmd.help){
				return list.push(`❯ \`${c.cmd.name}\`: ${c.cmd.help}`);
			} else {
				return list.push(`❯ \`${c.cmd.name}\`: *Extended help unavailable*.`)
			};
		});
		
		const embed: MessageEmbed = new MessageEmbed()
			.setColor('RANDOM')
			.setAuthor('Displaying help', client.user.displayAvatarURL())
			.setDescription(list.join('\n'))
			.setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL())
			.setTimestamp();

		return message.channel.send(embed);
	},
	help: 'A list of all commands.',
	aliases: ['cmds', 'commandlist', 'cmdlist']
};
