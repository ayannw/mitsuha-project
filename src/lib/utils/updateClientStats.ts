import { MitsuhaStats } from '../interfaces/MitsuhaStats';
import { MitsuhaClient } from '../MitsuhaClient';
import { totalmem, uptime } from 'os';
import { DurationFormatter } from '@sapphire/time-utilities';
import { version } from 'discord.js';

export const updateStats = (client: MitsuhaClient): MitsuhaStats => {
    const h = process.memoryUsage();
    const D = new DurationFormatter();
    const _: MitsuhaStats = {
        versions: {
            djs: version,
            node: process.version,
            tsc: '4.2.0-insiders',
        },
        bot: {
            users: client.guilds.cache.reduce(
                (acc, val) => acc + (val.memberCount || 0),
                0
            ),
            channels: client.channels.cache.size,
            guilds: client.guilds.cache.size,
            shards: 0,
        },
        heap: {
            total: String(h.heapTotal / 1048576).substring(0, 4) + 'mb',
            used: String(h.heapUsed / 1048576).substring(0, 4) + 'mb',
            totalmem: String(totalmem() / 1048576).substring(0, 4) + 'mb',
        },
        uptimes: {
            system: D.format(uptime() * 1000),
            client: D.format(client.uptime),
        },
    };

    return _;
};
