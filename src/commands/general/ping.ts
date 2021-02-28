import { Command } from "#lib/interfaces/Command";
import { Message } from "discord.js";
import { MitsuhaClient } from "#lib/interfaces/MitsuhaClient";

export const command: Command = {
  name: "ping",
  help: "Ping pong !",
  run: (client: MitsuhaClient, message: Message) => {
    message.channel.send("?").then((m) => {
      const ping = m.createdTimestamp - message.createdTimestamp;
      m.edit(`Pong! ${String(ping)}ms.`);
    });
  },
  category: "general",
};
