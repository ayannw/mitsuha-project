import * as fs from 'fs';
import * as logger from 'colorlogs';
let cmds: Map<string, any> = new Map();

fs.readdir('./src/commands/', (err, files): void => {
    if (err) return console.log(err);
    logger.warn('loading commands ...');
    files.forEach(file => {
        if (!file.endsWith(".ts") || file.startsWith('_')) return;
        let props = require(`../commands/${file}`);
        logger.success('loaded ' + 'commands/' + file);
        let commandName = file.split(".")[0];
        commands.set(commandName, props);
    });
});

export let commands = cmds;
