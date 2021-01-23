import { Command } from '../types/Command';
import { Client, User, Message, MessageEmbed } from 'discord.js';
import { getMember } from '../tools/getMember';

export const cmd: Command = {
  name: 'avatar',
  run: (client: Client, message: Message): Promise<Message> => {
    const member = getMember(message);
    if(!member) return message.channel.send('Could not find the user.');
    
    const user: User = client.users.cache.get(member.id);
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
