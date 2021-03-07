import { Client, Message } from 'discord.js';
import { tokens } from './config';
import { __MitsuhaClient__, MitsuhaClient } from '#lib/MitsuhaClient';
import { execMessage } from '#lib/utils/execMessage';
import { execCommand } from '#lib/utils/execCommand';
import * as logger from '#lib/logger';

const _client = new Client();

const client: MitsuhaClient = __MitsuhaClient__(_client);

const start = async () => {
    logger.info('logging in..');
    return await client.login(tokens.bot);
};

client.on('message', (message: Message) => {
    if (message.author.bot) return;
    const res = execMessage(client, message);

    if (res == false) return;
    if (res.startsWithPrefix) console.log(res);
    return execCommand(client, message, res.cmd, res.args);
});

client.once('ready', () => {
    logger.success('online, logged in as: ' + client.user.tag);
    logger.info('users: ' + client.users.cache.size);
    logger.info('guilds: ' + client.guilds.cache.size);
});
start();

export const mitsuha = client;
