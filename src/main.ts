const sTime: number = new Date().getTime();

import * as logger from '@ayanthedev/colorlogs';
import * as config from './config';
import * as server from './server';
import { Client, Message } from 'discord.js';
import { commands } from './handlers/command';
import { bgBlue, bgGreen } from 'colorette';
import { draw } from './tools/drawMitsuha';

const client: Client = new Client();

async function start(): Promise<void> {
  draw();
  logger.warn('logging in ...');
  server.start();
  await client.login(config.token);
};

client.on('message', (message: Message): void => {
  if(!message.channel) return;
  logger.info(bgBlue(message.guild.name) + bgGreen(message.author.tag));
  message.content.split('\n').forEach((line) => {
  	logger.info(line);
  });
  if(!message.content.startsWith(config.prefix)){ return; };
  if(message.content.startsWith(config.prefix)){
    const arr: string[] = message.content.split(' ');
    const cmd: string = arr[0].toLowerCase().split(config.prefix)[1];
    const args: string[] = arr.slice(1);

	try {
    	commands.forEach(command => {
    		if(command.cmd.name == cmd){
    			return commands.get(command.cmd.name).cmd.run(client, message, args);
        };

        if(command.cmd.aliases){
          command.cmd.aliases.forEach((alias) => {
            if(alias == cmd){
              return commands.get(command.cmd.name).cmd.run(client, message, args);
            };
          });
        };
      });
    } catch(err) {
      logger.error(err);
    	logger.error('unable to find/run command: ' + cmd);
    };
  };
});

client.once('ready', (): void => {
  logger.success(client.user.tag + ' is online');
  logger.success('Server started, port: 6969');
  const eTime: number = new Date().getTime();
  logger.info('took ' + (eTime - sTime) + 'ms to boot up');
});

start();
