import { Client } from 'discord.js';
import { tokens } from './config';
import * as logger from '#lib/logger';

const client = new Client();

const start = async () => {
	console.clear();
	return await client.login(tokens.bot);
}

client.once('ready', () => logger.success('k'));
start();


export default client;
