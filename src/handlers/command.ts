import * as fs from 'fs';
import * as logger from '@ayanthedev/colorlogs';
import { Collection } from 'discord.js';
import { green } from 'colorette';

let cmds: Collection<string, any> = new Collection();
let path: string = process.cwd() + '/build/commands/';

fs.readdir(path, (err, files): void => {
    if (err) return console.log(err);
    logger.warn('loading commands ...');
    files.forEach(file => {
        let props = require(`../commands/${file}`);
        logger.success('loaded ' + 'command: ' + green(file));
        let commandName = file.split(".")[0];
        commands.set(commandName, props);
    });
});

export const commands = cmds;
