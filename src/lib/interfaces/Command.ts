import { Client, Message } from 'discord.js';

export interface Command {
	name: string;
	help?: string;
	perms: string;
	ownerOnly?: boolean;
	run: (client: Client, message: Message, args: string[]) => any;
	usage?: string[];
	aliases?: string[];
}
