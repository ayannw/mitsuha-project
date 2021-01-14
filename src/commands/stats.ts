import { Client, Message, MessageEmbed } from 'discord.js';
import { version as dVersion } from 'discord.js'
import { memoryUsage } from 'process';
import { version, name } from '../config'; 
import { Command } from '../typings/Command';

export const cmd: Command = {
  name: 'stats',
  run: (client: Client, message: Message): Promise<Message> => {
    const users: number = client.users.cache.size;
    const channels: number = client.channels.cache.size;
    const guilds: number = client.guilds.cache.size;
    const memoryUsed: string = `${memoryUsage().heapUsed / 1048576}`.substring(0, 5) + 'MB';
    const description: string = `• Statistics:
❯ Users: ${users}
❯ Channels: ${channels}
❯ Guilds: ${guilds}
❯ Discord.js version: ${dVersion}
❯ Node.js version: ${process.version}
❯ Memory used: ${memoryUsed}`;
    const embed: MessageEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(name + ' ' + version, client.user.displayAvatarURL())
      .setDescription(description)
      .setTimestamp();

    return message.channel.send(embed);
  },
  help: 'My statistics.',
  alias: 'stat',
  cat: 'System'
};
