import { MitsuhaClient } from "../MitsuhaClient";
import { Message } from "discord.js";
import { Command } from "../interfaces/Command";
import { info } from "../logger";

export const execMessage = (client: MitsuhaClient, message: Message): any => {
  if (message.channel.type != "text") return false;
  if (message.author.bot) return false;

  info(
    // @ts-ignore
    `(${message.author.tag}) -> #${message.channel.name}: ${message.content}`
  );

  let swp = false;
  let str: string;
  let arr: string[];
  let cmd: string;
  let args: string[];

  const m = message.content;

  if (
    m.startsWith(client.config.prefix) ||
    m.startsWith(client.config.prefix.toUpperCase())
  ) {
    swp = true;
    str = m.toLowerCase().replace(client.config.prefix, "");
  }

  arr = str.split(/ +/);
  cmd = arr[0];
  args = arr.join(" ").replace(cmd, "").split(" ");

  return {
    startsWithPrefix: swp,
    cmd: cmd.toLowerCase(),
    args: args,
  };
};
