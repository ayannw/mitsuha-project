import { GuildMember, Client, Message } from 'discord.js'

export function getMember(message: Message, args: Array<string>): any {
  let member: GuildMember; 
	if(message.mentions.users.size > 0){
    member = message.guild.members.cache.get(message.mentions.users.first().id);
  };

  try {
    member = message.guild.members.cache.find(m => m.displayName.startsWith(args.join(' ')));
  } catch {
    member = message.guild.members.cache.get(message.author.id);
  }

  return member;
};
