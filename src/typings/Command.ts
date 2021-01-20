import { Client, Message } from 'discord.js';

interface Run {
	(client: Client, message: Message, args?: Array<string>)
};

export interface Command {
	name: string,
	run: Run,
	cat?: string,
	help?: string,
	alias?: string,
	ownerOnly?: boolean
};
