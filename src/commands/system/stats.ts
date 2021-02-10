import { Client, Message, MessageEmbed } from 'discord.js';
import { version as dVersion } from 'discord.js';
import { memoryUsage } from 'process';
import { version, name, tscV } from '../../config';
import { Command } from '../../types/Command';
import { embedItem as item } from '../../tools/mitsuhaEmbed';
import { getTime } from '../../tools/getTime';
import * as os from 'os';

export const cmd: Command = {
  name: 'stats',
  run: (client: Client, message: Message): Promise<Message> => {
    const users: number = client.users.cache.size;
    const channels: number = client.channels.cache.size;
    const guilds: number = client.guilds.cache.size;
    const heapTotal: string = String(memoryUsage().heapTotal / 1048576).substring(0, 5) + 'MB';
    const heapUsed: string = String(memoryUsage().heapUsed / 1048576).substring(0, 5) + 'MB';

    const description = '• **Statistics:**\n'
      + item('Users', users)
      + item('Channels', channels)
      + item('Guilds', guilds)
      + item('Discord.js version', dVersion)
      + item('Node.js version', process.version)
      + item('TypeScript version', tscV)
      + '\n'
      + '• **Heap:**\n'
      + item('Used', heapUsed)
      + item('Total', heapTotal)
      + '\n'
      + '• **Uptime:\n**'
      + item('System', getTime(os.uptime()))
      + item('Client', getTime(client.uptime));


    const embed: MessageEmbed = new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor(name + ' ' + version, client.user.displayAvatarURL())
      .setDescription(description)
      .setTimestamp();
    
    return message.channel.send(embed);
  },
  help: 'My statistics',
  usage: 'm.stats',
  catg: 'system'
};
