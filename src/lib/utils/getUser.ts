//@ts-nocheck stfu lmaon ts

import { MitsuhaClient } from '#lib/MitsuhaClient';
import { Message, User } from 'discord.js';

export const getUser = async (client: Client, message: Message, q: string) => {
    let user: null | GuildMember | true;

    if (q == '' || !q) return message.member.user;
    if (Number(q)) return (await client.users.fetch(q)) || null;

    try {
        user =
            message.mentions.users.first() ||
            message.guild.members.cache.find(
                (m) =>
                    m.user.tag.toLowerCase() == q.toLowerCase() ||
                    m.user.username.toLowerCase() == q.toLowerCase()
            ).user ||
            message.member.user;
    } catch {
        user = null;
    }

    return user;
};
