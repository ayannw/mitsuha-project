import { MitsuhaClient } from "../MitsuhaClient";
import { Message } from "discord.js";
import { Command } from "../interfaces/Command";
import { info } from "../logger";

export const execMessage = (client: MitsuhaClient, message: Message): any => {
  if (message.channel.type != "text") return;

  let swp = false;
  let str: string;
  let arr: string[];
  let cmd: string;
  let args: string[];

  const m = message.content;

  if (!m.startsWith(client.config.prefix)) return;
  if (m.startsWith(client.config.prefix)) {
    swp = true;
    str = m.replace(client.config.prefix, "");
  }

  arr = str.split(/ +/);
  cmd = arr[0];
  args = arr.join(" ").replace(cmd, "").split(" ");

  return {
    startsWithPrefix: swp,
    cmd: cmd,
    args: args,
  };
};
