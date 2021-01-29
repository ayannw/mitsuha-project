import { Message } from 'discord.js';

export function getMember(message: Message, args: string[]): any {
  let member: any;
  let guild = message.guild;
	
  if(args.length == 0) {
  	return guild.members.cache.get(message.author.id);
  } else {
		let arg: string = args[0];
  	member = message.mentions.users.first()
  		|| guild.members.cache.get(arg)
  		|| guild.members.cache.find(
			(m) => m.user.username == arg
			|| m.user.username == arg.toLowerCase()
			|| m.user.username.startsWith(arg)
			|| m.user.username.startsWith(arg.toLowerCase())
			|| m.user.username.toLowerCase().startsWith(arg)
			|| m.displayName == arg
			|| m.displayName.startsWith(arg)
			|| m.displayName == arg.toLowerCase()
			|| m.displayName.startsWith(arg.toLowerCase())
			|| m.displayName.toLowerCase().startsWith(arg)
			|| m.user.tag == arg
		)
		|| false;
  };

  return member;
};
