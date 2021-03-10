import { MitsuhaClient } from '../MitsuhaClient';
import { Message } from 'discord.js';
import { Command } from '../interfaces/Command';
import { info } from '../logger';

export const execMessage = (client: MitsuhaClient, message: Message): any => {
    if (message.channel.type != 'text') return false;
    if (message.author.bot) return false;

    info(
        // @ts-ignore
        `(${message.author.tag}) -> #${message.channel.name}: ${message.content}`
    );

    let swp = false;
    let str: string;
    let arr: string[];
    let cmd: string;
    let args: string[];

    const m = message.content;

    if (m.toLowerCase().startsWith(client.config.prefix)) {
        swp = true;
        str = m.replace(client.config.regexPrefix, '').split(/ +/).join(' ');
    } else {
        return false;
    }

    arr = str.split(' ');
    cmd = arr[0];
    args = arr.join(' ').replace(cmd, '').split(' ');
    args.shift();

    return {
        startsWithPrefix: swp,
        cmd: cmd.toLowerCase(),
        args: args,
    };
};
