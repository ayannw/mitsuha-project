import { Message } from 'discord.js';

export const getMember = (message: Message, args: string[]): any => {
    return (
        message.mentions.members.first() ||
        //@ts-ignore
        message.guild.members.cache.find((m) => {
            m.user.tag == args[0] ||
                m.user.username == args[0] ||
                m.displayName == args[0];
        }) ||
        message.member
    );
};
