import { Command } from '../types/Command';
import { Client, Message, User, MessageEmbed } from 'discord.js';
import { getMember } from '../tools/getMember';
import { embedItem as item } from '../tools/mitsuhaEmbed';

export const cmd: Command = {
  name: 'whois',
  run: async (client: Client, message: Message, args: Array<any>): Promise<Message> => {
  const member: any = getMember(message, args);
  if(!member) return message.channel.send('Unable to find the user.');

  const user: User = client.users.cache.get(member.id);
  const description: string = '• User Information\n'
    + item('Name', user.username)
    + item('Discriminator', user.discriminator)
    + item('Avatar', `[URL](${user.displayAvatarURL({ dynamic: true })})`)
    + item('Mention', `<@${user.id}>`)
    + item('Created at', `${String(user.createdAt).substring(0, 25)}`);

  const embed: MessageEmbed = new MessageEmbed()
  	.setColor('RANDOM')
  	.setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
  	.setThumbnail(user.displayAvatarURL({ dynamic: true }))
  	.setDescription(description)
		.setFooter('\u202b', client.user.displayAvatarURL({ dynamic: true }))
		.setTimestamp();
    
    
    return message.channel.send(embed);
  },
  help: 'Shows information about a Discord user/guild member',
  aliases: ['userinfo'],
  cat: 'Tools',
  usage: 'm.whois | m.whois <@user>'
};
