import { Client, Message } from 'discord.js';

interface Run {
	(client: Client, message: Message, args?: Array<string>)
};

export interface Command {
	name: string,
	run: Run,
	help?: string,
	aliases?: Array<string>,
	ownerOnly?: boolean
};
