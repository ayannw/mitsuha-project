// @ts-nocheck

import * as config from "#root/config";
import { Client, Message, Collection } from "discord.js";
import { Command } from "./interfaces/Command";
import { commands } from "./handlers/command";

export interface MitsuhaClient extends Client {
  type: string;
  commands: any;
  //execCommand: Exec;
  //extractMessage: (message: Message) => any;
  config: any;
}

interface Exec {
  (client: MitsuhaClient, message: Message, args?: string[]): any;
}

export const __MitsuhaClient__ = (client: Client) => {
  let _ = client as MitsuhaClient;
  _.type = "MitsuhaClient";
  _.commands = commands;
  _.config = config;

  return _;
};
