import { MessageEmbed, Message } from 'discord.js';
import { Command } from '#lib/interfaces/Command';
import { MitsuhaClient } from '#lib/MitsuhaClient';
import { twemojify } from '#lib/utils/twemojify';

export const command: Command = {
    name: 'help',
    help: 'List of all commands/Detailed information about a command',
    run: async (client: MitsuhaClient, message: Message, args: string[]) => {
        const cmap = [
            {
                name: 'General',
                commands: new Map(),
            },
            {
                name: 'Tools',
                commands: new Map(),
            },
            {
                name: 'Moderation',
                commands: new Map(),
            },
            {
                name: 'System',
                commands: new Map(),
            },
            {
                name: 'Owner',
                commands: new Map(),
            },
        ];
        const allc = await client.commands;
        allc.sort().forEach((c) => {
            cmap.forEach((m) => {
                if (c.category === m.name.toLowerCase())
                    return m.commands.set(c.name, c);
            });
        });

        const list: string[] = [];

        cmap.forEach((c) => {
            if (c.commands.size == 0) return;
            let str = `\n#️⃣ **${c.name}**\n`;

            c.commands.forEach((i) => {
                const e = twemojify(i.name[0]);
                str += `> ${e} **${i.name}**: ${
                    i.help || '_Description unavailable_.'
                }\n`;
            });
            list.push(str);
        });

        const embed: MessageEmbed = new MessageEmbed()
            .setAuthor('Displaying help', client.user.displayAvatarURL())
            .setDescription(list.join(''))
            .setColor(client.config.colors.normal)
            .setFooter(
                'Requested by ' + message.author.tag,
                message.author.displayAvatarURL({
                    dynamic: true,
                })
            );

        return message.channel.send(embed);
    },
    category: 'general',
    aliases: ['list'],
};
