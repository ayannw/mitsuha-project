import { SapphireClient } from '@sapphire/framework';
import { Command } from '#lib/interfaces/Command';
import * as config from '~/config';

export class MitsuhaClient extends SapphireClient {
	public commands: Array<Command>;
	
}
