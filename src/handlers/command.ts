import * as fs from 'fs';
import * as logger from 'colorlogs';
import { Collection } from 'discord.js';
import { bgCyan } from 'colorette';

let cmds: Collection<string, any> = new Collection();

fs.readdir('./src/commands/', (err, files): void => {
    if (err) return console.log(err);
    logger.warn('loading commands ...');
    files.forEach(file => {
        let props = require(`../commands/${file}`);
        logger.success('loaded ' + 'command: ' + bgCyan(file));
        let commandName = file.split(".")[0];
        commands.set(commandName, props);
    });
});

export let commands = cmds;
