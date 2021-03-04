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
    let _: any = c.find((x) => x.name == cmd || new Set(x.aliases).has(cmd));

    if (_.ownerOnly) {
      client.config.owners.forEach((u) => {
        if (message.author.id === u) {
          return _.run(client, message, args);
        } else {
          return message.channel.send("You don't own me");
        }
      });
    } else {
      return _.run(client, message, args);
    }
  } catch (err) {
    return error(err);
  }
};
