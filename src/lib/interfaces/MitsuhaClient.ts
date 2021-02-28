import { Client, Message, Collection } from "discord.js";
import { Command } from "./Command";

export interface MitsuhaClient extends Client {
  commands: Collection<string, Command>;
  //execCommand: (client: Client, message: Message, args: string[]) => any;
  //extractMessage: (message: Message) => any;
  config: any;
}
