import { Client } from "discord.js";
import { commands as _commands_ } from "#lib/handlers/command";
import { _MitsuhaClient_ } from "./interfaces/_MitsuhaClient_";
import * as _config_ from "#root/config";

/*export const __MitsuhaClient__ = (client: Client): _MitsuhaClient_ => {
  let _ = client as _MitsuhaClient_;

  _.commands = commands;
  _.config = config;

  return _;
};*/

export interface MitsuhaClient extends  _MitsuhaClient_ {
	type: string;
}

export class MitsuhaClient {
	constructor(client: Client) {
		let __ = client as MitsuhaClient;
		__.commands = _commands_;
		__.config = _config_;
		__.type = "MitsuhaClient";
		//@ts-ignore
		return { __client: __ }
	}
}
