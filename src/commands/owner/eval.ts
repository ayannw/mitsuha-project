import { MitsuhaClient } from "#lib/MitsuhaClient";
import { Stopwatch } from "@sapphire/stopwatch";
import { Message, MessageEmbed, version } from "discord.js";
import { Command } from "#lib/interfaces/Command";
import { inspect } from "util";
import { info } from "#lib/logger";

export const command: Command = {
  name: "eval",
  run: (client: MitsuhaClient, message: Message) => {
    const code = message.content.substr(message.content.indexOf(" ") + 1);
    let output: string;
    let embed: MessageEmbed = new MessageEmbed().setAuthor(
      "Eval",
      message.author.displayAvatarURL()
    );
    let d: string;

    const sw = new Stopwatch();
    let time: string | boolean;

    try {
      sw.start();
      output = inspect(eval(code));
      const rType = typeof output;
      time = sw.stop().toString();

      embed.setColor(client.config.colors.normal);
    } catch (err) {
      output = err;
      time = false;

      embed.setColor(client.config.colors.error);
    }

    String(output)
      .split("\n")
      .forEach((line) => info(line));

	if (output.length >= 2000) return message.channel.send("Output too long");
    if (String(output).includes(client.config.tokens.bot)) return message.channel.send("No.");

    output = "```js\n" + output + "```";
    d =
      "\n```asciidoc\n" +
      "Node.js version    : " +
      process.version +
      "\nDiscord.js version : " +
      version +
      "```\n" +
      "**Output**:\n" +
      output;

    embed.setDescription(d);
    time
      ? embed.setFooter(`Done in ${time}`, client.user.displayAvatarURL())
      : embed.setFooter("Error", client.user.displayAvatarURL());

    return message.channel.send(embed);
  },
  ownerOnly: true,
  aliases: ["ev"],
  category: "owner",
};
