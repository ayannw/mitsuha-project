import { Client, Message } from 'discord.js';
import { Command } from '../typings/Command';

export const cmd: Command = {
  name: 'ping',
  run: async (client: Client, message: Message): Promise<void> => {
    await message.reply(`Pong! Heartbeat: ${client.ws.ping}ms`);
  },
  help: 'Check my latency & heartbeat.',
  alias: 'pong'
};
