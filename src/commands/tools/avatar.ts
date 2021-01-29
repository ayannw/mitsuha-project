import { Command } from '../../types/Command';
import { Client, User, Message, MessageEmbed } from 'discord.js';
import { getMember } from '../../tools/getMember';

export const cmd: Command = {
  name: 'avatar',
  run: (client: Client, message: Message, args: string[]): Promise<Message> => {
    const member = getMember(message, args);
	if(!member) return message.channel.send('Unable to find the user.');
    
    const user: User = member.user;
    const embed: MessageEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true}))
      .setImage(user.displayAvatarURL({ dynamic: true}) + '?size=2048')
      .setTimestamp();
    
    return message.channel.send(embed);
  },
  aliases: ['a', 'av', 'pfp'],
  usage: 'm.avatar | m.avatar <@user>'
};
