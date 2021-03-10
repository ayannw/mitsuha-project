import { MitsuhaClient } from '#lib/MitsuhaClient';
import { Command } from '#lib/interfaces/Command';
import { User, Message, MessageEmbed } from 'discord.js';
import { getUser } from '#lib/utils/getUser';

export const command: Command = {
    name: 'avatar',
    help: "View somebody's avatar.",
    run: async (client: MitsuhaClient, message: Message, args: string[]) => {
        const user = await getUser(client, message, args[0]);
        if (!user) return message.channel.send('Unable to find the user.');

        const embed: MessageEmbed = new MessageEmbed()
            .setColor(client.config.colors.normal)
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setImage(user.displayAvatarURL({ dynamic: true }) + '?size=2048')
            .setTimestamp();

        return message.channel.send(embed);
    },
    aliases: ['a', 'av', 'pfp'],
    category: 'tools',
};
