import * as logger from '@ayanthedev/colorlogs';
import { Collection } from 'discord.js';
import { green } from 'colorette';
import { sync } from 'glob';
import { resolve } from 'path';

logger.warn('loading commands ...');

const s: number = new Date().getTime();

const cmds: Collection<string, any> = new Collection();
const path: string = process.cwd() + '/build/commands/';

sync(path + '**/*.*').forEach((file) => {
	const props = require(resolve(file));
	const n: number = new Date().getTime();
	const commandName: string = file.split('commands/')[1]
		.split('.')[0].split('/')[1];
	logger.success('├─ loaded command: '
	    + green(commandName)
		+ ' in '
	    + String(n-s)
	    + 'ms');
	cmds.set(commandName, props);
});
logger.success(`└─ loaded ${cmds.size} commands`);

export const commands = cmds;
