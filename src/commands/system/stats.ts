import { Command } from "#lib/interfaces/Command";
import { Message, MessageEmbed } from "discord.js";
import { MitsuhaClient } from "#lib/MitsuhaClient";
import { embedItem as item } from "#lib/utils/mitsuhaEmbed";
import { updateStats } from "#lib/utils/updateClientStats";

export const command: Command = {
  name: "stats",
  help: "My statistics.",
  run: (client: MitsuhaClient, message: Message) => {
    const s = updateStats(client);
    let embed: MessageEmbed = new MessageEmbed()
      .setAuthor("Statistics", client.user.displayAvatarURL())
      .setColor(client.config.colors.normal)
      .setFooter("\x20", client.user.displayAvatarURL())
      .setTimestamp();

    const des: string =
      item("Node.js", s.versions.node) +
      item("Discord.js", s.versions.djs) +
      item("TypeScript", s.versions.tsc) +
      "\n" +
      item("Users", s.bot.users) +
      item("Guilds", s.bot.guilds) +
      item("Channels", s.bot.channels) +
      "\n" +
      item("Heap", `${s.heap.used} (Total: ${s.heap.total})`) +
      item("System uptime", s.uptimes.system) +
      item("Client uptime", s.uptimes.client);

    embed.setDescription(des);

    return message.channel.send(embed);
  },
  category: "system",
  aliases: ["stat"],
};
