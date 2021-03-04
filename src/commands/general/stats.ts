import { Command } from "#lib/interfaces/Command";
import { Message } from "discord.js";
import { MitsuhaClient } from "#lib/MitsuhaClient";
import { updateStats } from "#lib/utils/updateClientStats";

export const command: Command = {
  name: "stats",
  help: "My statistics.",
  run: (client: MitsuhaClient, message: Message) => {
    const s = updateStats(client);
    message.channel.send(
      String("```\n" + "Users: " + String(s.bot.users) + "```")
    );
  },
  category: "general",
};
