import { Client } from 'discord.js';
import { tokens } from './config';
import * as logger from '#lib/logger';

const client = new Client();

client.once('ready', () => logger.success('k'));

client.login(tokens.bot);
