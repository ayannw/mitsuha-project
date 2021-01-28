import { Message } from 'discord.js';

export function getMember(message: Message, args: string[]): any {
  let member: any;
  let guild = message.guild;
	
  if(args.length == 0) {
  	return member = guild.members.cache.get(message.author.id);
  } else {
  	member = message.mentions.users.first()
  		|| guild.members.cache.get(args[0])
  		|| guild.members.cache.find(
  		(m) => m.user.username == args[0]
  			|| m.user.username.startsWith(args[0])
			|| m.displayName == args[0]
			|| m.displayName.startsWith(args[0])
			|| m.nickname == args[0]
			|| m.user.tag == args[0]
		)
		|| false;
  };

  return member;
};
