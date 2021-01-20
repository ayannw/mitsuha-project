import { Message } from 'discord.js'

export function getMember(message: Message): any {
  let member: any;
  if(message.mentions.users.size == 0) {
    member = message.guild.members.cache.get(message.author.id);
  } else if(message.mentions.users.size == 1) {
    member = message.mentions.users.first();
  } else if(message.mentions.users.size > 1) {
    member = false;
  } else {
    member = false;
  };

  return member;
};
