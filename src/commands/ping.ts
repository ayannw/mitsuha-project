import { Client, Message } from 'discord.js';
import { Command } from '../typings/Command';

export const cmd: Command = {
  name: 'ping',
  run: (client: Client, message: Message) => {
    message.channel.send('?').then(m => {
          const ping: number  = m.createdTimestamp -  message.createdTimestamp;
          return m.edit('<:online:735517961602727957> Pong! Latency ' + ping + 'ms, heartbeat ' + client.ws.ping + 'ms <a:heartbeat:785064044322488330>');
        })
  },
  help: 'Check my latency & heartbeat',
  aliases: ['pong', 'latency']
};
