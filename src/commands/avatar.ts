import { Command } from '../typings/Command';
import { Client, Message, User, MessageEmbed } from 'discord.js';
import { getMember } from '../tools/getMember';

export const cmd: Command = {
  name: 'avatar',
  run: (client: Client, message: Message): Promise<Message> => {
    const member = getMember(message);
    if(!member) return message.channel.send('Could not find the user.');
    
    const embed: MessageEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(member.tag, member.displayAvatarURL({ dynamic: true}))
      .setImage(member.displayAvatarURL({ dynamic: true}) + '?size=2048')
      .setTimestamp();
    
    return message.channel.send(embed);
  }
};