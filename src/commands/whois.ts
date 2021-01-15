import { Command } from '../typings/Command';
import { Client, Message, User, GuildMember, MessageEmbed } from 'discord.js';
import { getUser } from '../tools/getUser';

export const cmd: Command = {
  name: 'whois',
  run: async (client: Client, message: Message, args: Array<any>): Promise<Message> => {
    //let user = getUser(client, message, args);
	let user;
	
	if(message.mentions.users.size >= 1){
  		user = message.mentions.users.first();
  	};
       if(message.mentions.users.size === 0){
        if(Boolean(args[0])){
          try {
            user = client.users.cache.find(u => u.username.startsWith(args.join(' ')))
  				|| message.guild.members.cache.find(m => m.nickname.startsWith(args.join(' ')));
          } catch {
            return await message.channel.send('Unable to find the user.')
          };
        };
        
        if(!Boolean(args[0])){
          user = message.author;
        };
      };
	
    const embed: MessageEmbed = new MessageEmbed()
    	.setColor('RANDOM')
    	.setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
    	.setThumbnail(user.displayAvatarURL({ dynamic: true }))
    	.setDescription(`• User Information
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
  alias: 'userinfo'
};
