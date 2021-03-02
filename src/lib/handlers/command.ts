import * as logger from "#lib/logger";
import glob from "glob";
import { resolve } from "path";
import { Command } from "#lib/interfaces/Command";
import { Collection } from "discord.js";
import { Stopwatch } from "@sapphire/stopwatch";

const sw = new Stopwatch();
logger.warn("loading commands ...");

const getCommands = async () => {
  const cmds: Map<string, Command> = new Map();
  const path: string = process.cwd() + "/dist/commands/";
  glob.sync(path + "**/*.js").forEach(async (file) => {
    let props = await import(file);
    props = await props.command;
    cmds.set(props.name, props);
  });
  return cmds;
};

console.log(getCommands());
//logger.success(`└─ loaded ${_cmds.commands.size} commands in ${_cmds.time}`);

export const commands = 69;
