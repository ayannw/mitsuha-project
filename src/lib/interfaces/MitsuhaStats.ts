export interface MitsuhaStats {
  versions: {
    node: string;
    djs: string;
    tsc: string;
  };
  bot: {
    users: number;
    guilds: number;
    channels: number;
    shards: number;
  };
  heap: {
    used: string;
    total: string;
    totalmem: string;
  };
  uptimes: {
    system: string;
    client: string;
  };
}
