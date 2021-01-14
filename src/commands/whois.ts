import { Command } from '../typings/Command';
import { Client, Message, User, GuildMember } from 'discord.js';

export const cmd: Command = {
  name: 'whois',
  run: (client: Client, message: Message, args: Array<any>)=> {
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
          return message.channel.send('Unable to find the user.')
        };
      };
      
      if(!Boolean(args[0])){
        user = message.author;
      };
    };

	console.log(user)
    return message.channel.send(user.tag);
  }
};
