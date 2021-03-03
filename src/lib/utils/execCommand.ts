import { MitsuhaClient } from "../MitsuhaClient";
import { Message } from "discord.js";
import { error } from "../logger";

export const execCommand = async (
  client: MitsuhaClient,
  message: Message,
  cmd: string,
  args?: string[]
) => {
  let c = await client.commands;
  try {
    return c.get(cmd).run(client, message, args).run(client, message, args);
  } catch (err) {
    return error(err);
  }
};
