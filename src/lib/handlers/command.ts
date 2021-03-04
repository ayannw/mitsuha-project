// @ts-nocheck

import { resolve } from "path";
import { Command } from "#lib/interfaces/Command";
import { Collection } from "discord.js";
import { readdir } from "fs";

const _getCommands = async () => {
  const cmds: Collection<string, Command> = new Collection();
  const path: string = process.cwd() + "/dist/commands/";

  const commands = await new Promise((resolve, reject) =>
    readdir(path, (e, ls) =>
      e ? reject(e) : resolve(ls.map((i) => `${path}${i}/`))
    )
  )
    .then((ls) =>
      Promise.all(
        ls.map(
          (path) =>
            new Promise((resolve, reject) =>
              readdir(path, (e, ls) =>
                e ? reject(e) : resolve(ls.map((i) => `${path}${i}`))
              )
            )
        )
      ).then((lists) => lists.reduce((a, b) => [...a, ...b], []))
    )
    .then((list) => Promise.all(list.map((l) => import(l))));
  commands.forEach(({ command }) => cmds.set(command.name, command));

  return cmds;
};

const _commandMap = async () => {
  const cmap = {
    General: new Map(),
    Tools: new Map(),
    Moderation: new Map(),
    Owner: new Map(),
    Uncategorized: new Map(),
  };
  const allc = await _getCommands();

  allc.forEach((c) => {
    if (c.category) {
      switch (c.category) {
        case "general":
          cmap.General.set(c);
          break;
        case "tools":
          cmap.Tools.set(c);
          break;
        case "moderation":
          cmap.Moderation.set(c);
          break;
        case "owner":
          cmap.Owner.set(c);
      }
    } else {
      cmap.get("Uncategorized").set(c);
    }
  });
};

export const commands = _getCommands();
export const commandMap = _commandMap()!;
