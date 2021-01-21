import { Command } from '../typings/Command';
import { Client, Message, User, MessageEmbed } from 'discord.js';
import { getMember } from '../tools/getMember';

export const cmd: Command = {
  name: 'whois',
  run: async (client: Client, message: Message, args: Array<any>): Promise<Message> => {
  const member: any = getMember(message);

  if(!member) return message.channel.send('Could not find the user.');
  const user: User = client.users.cache.get(member.id);
  const embed: MessageEmbed = new MessageEmbed()
  	.setColor('RANDOM')
  	.setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
  	.setThumbnail(user.displayAvatarURL({ dynamic: true }))
  	.setDescription(`• user Information
❯ Name: ${user.username}
❯ Discriminator: ${user.discriminator}
❯ Avatar: [URL](${user.displayAvatarURL({ dynamic: true })})
❯ Mention: <@${user.id}>
❯ ID: ${user.id}
❯ Created at: ${String(user.createdAt).substring(0, 25)}`)
		.setFooter('\u202b', client.user.displayAvatarURL({ dynamic: true }))
		.setTimestamp();
    
    return await message.channel.send(embed);
  },
  help: 'Shows information about a Discord user/guild member.',
  aliases: ['userinfo'],
  cat: 'Tools'
};
