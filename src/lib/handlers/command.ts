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
  const cmap = [
    {
      name: "general",
      commands: new Map(),
    },
    {
      name: "tools",
      commands: new Map(),
    },
    {
      name: "moderation",
      commands: new Map(),
    },
    {
      name: "system",
      commands: new Map(),
    },
    {
      name: "owner",
      commands: new Map(),
    },
  ];
  const allc = await _getCommands();

  allc.forEach((c) => {
    cmap.forEach((m) => {
      if (c.category === m.name) return m.commands.set(c.name, c);
    });
  });
};

export const commands = _getCommands();
export const commandMap = _commandMap()!;
