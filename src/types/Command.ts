import { Client, Message } from 'discord.js';

interface Run {
	(client: Client, message: Message, args?: string[])
};

export interface Command {
	name: string,
	run: Run,
	cat?: string,
	help?: string,
	aliases?: string[],
	ownerOnly?: boolean
};
