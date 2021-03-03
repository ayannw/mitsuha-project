import { Client } from "discord.js";
import { tokens } from "./config";
import { __MitsuhaClient__ } from "#lib/MitsuhaClient";
import * as logger from "#lib/logger";

const _client = new Client({
  ws: {
    intents: ["GUILD_MEMBERS", "DIRECT_MESSAGES"],
  },
});

const client = __MitsuhaClient__(_client);

const start = async () => {
  logger.info("logging in..");
  return await client.login(tokens.bot);
};

client.once("ready", async () => {
  logger.success("online, logged in as: " + client.user.tag);
  logger.info("users: " + client.users.cache.size);
  logger.info("guilds: " + client.guilds.cache.size);
});
start();

export const mitsuha = client;
