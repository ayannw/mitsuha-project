import { User, Client, Message } from 'discord.js'

export function getUser(client: Client, message: Message, args: Array<string>): any {
	if(message.mentions.users.size >= 1){
       return message.mentions.users.first();
    };
    if(message.mentions.users.size === 0){
      if(Boolean(args[0])){
        try {
          let user = message.guild.members.cache.find(m => m.displayName.startsWith(args.join(' ')));
		  if(!user){
		  	return 'Unable to find user.';
		  }
        } catch {
          return 'Unable to find the user.';
        };
      };

      if(!Boolean(args[0])){
        return message.author;
      };
    };
};
