import * as logger from "@ayanthedev/colorlogs";
import { sync } from "glob";
import { resolve } from "path";

logger.warn("loading commands ...");

const s: number = new Date().getTime();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cmds: Map<string, any> = new Map();
const path: string = process.cwd() + "/build/commands/";

sync(path + "**/*.*").forEach((file) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const props = require(resolve(file));
  const commandName: string = file
    .split("commands/")[1]
    .split(".")[0]
    .split("/")[1];
  cmds.set(commandName, props);
});

const e: number = new Date().getTime();
logger.success(`└─ loaded ${cmds.size} commands in ${e - s}ms`);

export const commands = cmds;
