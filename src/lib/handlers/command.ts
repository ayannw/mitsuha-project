import * as logger from "#lib/logger";
import glob from "glob";
import { resolve } from "path";
import { Command } from "#lib/interfaces/Command";
import { Collection } from "discord.js";
import { Stopwatch } from "@sapphire/stopwatch";

const sw = new Stopwatch();
logger.warn("loading commands ...");

const cmds: Collection<string, Command> = new Collection();
const path: string = process.cwd() + "/dist/commands/";

sw.start();
glob.sync(path + "**/*.js").forEach(async (file) => {
  let props = await import(resolve(file));
  props = props.command;

  console.log(props);
  const commandName = props.name;
  cmds.set(commandName, props);
});

console.log(cmds);
logger.success(`└─ loaded ${cmds.size} commands in ${sw.stop().toString()}`);

export const commands = cmds;
