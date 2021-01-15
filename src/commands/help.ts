import { commands } from '../handlers/command';
import { Client, Message, MessageEmbed } from 'discord.js';

export const cmd = {
	name: 'help',
	run: (client: Client, message: Message, args: Array<any>) => {
		let list: Array<string> = [];
		
		commands.forEach(c => {
			if(c.cmd.ownerOnly) return;
			if(c.cmd.help){
				if(c.cmd.alias){
					return list.push(`❯ \`${c.cmd.name}|${c.cmd.alias}\`: ${c.cmd.help}`);
				};
				return list.push(`❯ \`${c.cmd.name}\`: ${c.cmd.help}`);
			};
			if(!c.cmd.help){
				if(c.cmd.alias){                                                                            list.push(`❯ \`${c.cmd.name}|${c.cmd.alias}\`: ${c.cmd.help}`);
					return list.push(`❯ \`${c.cmd.name}|${c.cmd.alias}\`: *Extended help unavailable*.`);
				};
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
	alias: 'cmds'
};
