import * as logger from '#lib/logger';
import glob from 'glob';
import { resolve } from 'path';
import { Command } from '#lib/interfaces/Command';
import { Collection } from 'discord.js';
import { Stopwatch } from '@sapphire/stopwatch';

const sw = new Stopwatch();
logger.warn('loading commands ...');

const cmds: Collection<string, Command> = new Collection();
const path: string = process.cwd() + '/dist/commands/';

sw.start();
glob.sync(path + '**/*.*').forEach((file) => {
	let props;
	(async () => {
		props = await import(resolve(file));
		props = props.command;
	})();
	const commandName = props.name;
	cmds.set(commandName, props);
});

logger.success(`└─ loaded ${cmds.size} commands in ${sw.stop().toString()}`);

export const commands = cmds;
