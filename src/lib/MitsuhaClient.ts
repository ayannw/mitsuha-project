import { Client } from "discord.js";
import { commands } from "#lib/handlers/command";
import { MitsuhaClient as _MitsuhaClient_ } from "./interfaces/MitsuhaClient";
import * as config from "#root/config";

export const __MitsuhaClient__ = (client: Client): _MitsuhaClient_ => {
  let _ = client as _MitsuhaClient_;

  _.commands = commands;
  _.config = config;

  return _;
};
