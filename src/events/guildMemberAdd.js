import { Client, GuildMember } from "discord.js";

export const event = {
  name: "guildMemberAdd",
  trigger: async (client: Client, member: GuildMember) => {
    return await member.fetch();
  },
};
