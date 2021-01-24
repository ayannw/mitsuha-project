import * as fs from 'fs';
import * as logger from '@ayanthedev/colorlogs';
import { Collection } from 'discord.js';
import { green } from 'colorette';

const s: number = new Date().getTime();

let cmds: Collection<string, any> = new Collection();
let path: string = process.cwd() + '/build/commands/';

fs.readdir(path, (err, files): void => {
    if (err) return console.log(err);
    logger.warn('loading commands ...');
    files.forEach(file => {
        let props = require(`../commands/${file}`);
        let n: number = new Date().getTime();
        logger.success('├─ loaded '
        	+ green(file)
        	+ ' in '
        	+ String(n-s)
        	+ 'ms');
        let commandName = file.split(".")[0];
        commands.set(commandName, props);
    });
    logger.success(`└─ loaded ${cmds.size} commands`);
});

export const commands = cmds;
