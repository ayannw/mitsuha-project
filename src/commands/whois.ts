import { Command } from '../typings/Command';
import { Client, Message, User, GuildMember } from 'discord.js';

export const cmd: Command = {
  name: 'whois',
  run: (client: Client, message: Message, args: Array<any>)=> {
    let user: User;

    if(message.mentions.users.size === 0){
      if(Boolean(args[0])){
        if(Boolean(Number(args[0]))){
          try{
            user = client.users.cache.find(u => u.id === String(args[0]));
          } catch {
            return message.channel.send('Unable to find the user.')
          }
        };
        user = client.users.cache.find(u => u.username.startsWith(args.join(' ')));
      };
      if(!Boolean(args[0])){
        user = message.author;
      };
    };

    let member: GuildMember = message.guild.members.cache.get(user.id);
  }
};