interface EngineModule {
  getInstanceID(): string;
  getBotID(): string;
  getBackend(): EngineBackend;
  setInstanceLogLevel(level: number): boolean;
  setBotLogLevel(level: number): boolean;
  getInstanceLogLevel(): number;
  getBotLogLevel(): number;
  reloadScripts(): boolean;
  getNick(): string;
  setNick(nick: string): boolean;
  setDefaultChannelID(channelID: string): boolean;
  isRunning(): boolean;
  notify(message: string): void;
  saveConfig(config: any): void;
  log(log: any): void;
  export(obj: any): void;
  removeAvatar(): boolean;
  setAvatarFromTrack(track: Track): boolean;
  setDefaultAvatar(): boolean;
  setAvatarFromBanner(bannerName: string): boolean;
  setAvatarFromURL(url: string): boolean;
  getUsers(): User[];
  getUserById(id: string): User | undefined;
  getUserByName(name: string): User | undefined;
  setCommandPrefix(prefix: string): void;
  getCommandPrefix(): string;
}

declare enum EngineBackend {
  Teamspeak = "ts3",
  Discord = "discord"
}
