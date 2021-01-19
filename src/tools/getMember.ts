import { Message } from 'discord.js'

export function getMember(message: Message, args: Array<string>): any {
  let member: any;

  if(!args) member = message.guild.members.cache.get(message.author.id); 
	if(message.mentions.users.size > 0){
    member = message.guild.members.cache.get(message.mentions.users.first().id);
  };
  if(args){
    try {
      member = message.guild.members.cache.find(m => m.displayName.startsWith(args.join(' ')));
    } catch {
      member = false;
    }
  };

  return member;
};
