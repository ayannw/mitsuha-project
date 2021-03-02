import { Client } from "discord.js";
import { tokens } from "./config";
import { MitsuhaClient } from "#lib/MitsuhaClient";
import * as logger from "#lib/logger";

const _client = new Client({
  ws: {
    intents: ["GUILD_MEMBERS", "DIRECT_MESSAGES"],
  },
});

const client: MitsuhaClient = new MitsuhaClient(_client).__client;

const start = async () => {
  return await client.login(tokens.bot);
};

client.once("ready", () => {
  logger.success("online, logged in as: " + client.user.tag);
  logger.info("users: " + client.users.cache.size);
  logger.info("guilds: " + client.guilds.cache.size);
});
start();

export const mitsuha = client;
