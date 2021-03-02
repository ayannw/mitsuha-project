import { Client, Message, Collection } from "discord.js";
import { Command } from "./Command";

export interface _MitsuhaClient_ extends Client {
  //commands: Collection<string, Command>;
  commands: any;
  //execCommand: (client: Client, message: Message, args: string[]) => any;
  //extractMessage: (message: Message) => any;
  config: any;
}
