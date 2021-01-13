const sTime: number = Date.now();

import * as logger from 'colorlogs';
import * as config from './config';
import { Client, Message } from 'discord.js';
import { commands } from './handlers/command';

const client: Client = new Client();

async function start(): Promise<void> {
  logger.warn('starting...');

  await client.login(config.token);
};

client.on('message', (message: Message): void => {
  if(!message.content.startsWith(config.prefix)){ return; };
  if(message.content.startsWith(config.prefix)){
    const arr: Array<string> = message.content.split(' ');
    const cmd: string = arr[0].toLowerCase().split(config.prefix)[1];
    const args: Array<string> = arr.slice(1);

    return commands.get(cmd).cmd.run(client, message, args);
  };
})

client.once('ready', (): void => {
  logger.success(client.user.tag + ' is online');
  const eTime: number = Date.now();
  logger.info('took ' + (eTime - sTime) + 'ms to boot up');
});

start();
