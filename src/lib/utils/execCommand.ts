import { MitsuhaClient } from "../MitsuhaClient";
import { Message } from "discord.js";
import { error } from "../logger";

export const execCommand = async (
  client: MitsuhaClient,
  message: Message,
  cmd: string,
  args?: string[]
) => {
  const c = await client.commands;
  try {
    return c
      .find((x) => x.name == cmd || new Set(x.aliases).has(cmd))
      .run(client, message, args);
  } catch (err) {
    return error(err);
  }
};
