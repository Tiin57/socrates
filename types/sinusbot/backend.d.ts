interface BackendModule {
  connect(): boolean;
  disconnect(): boolean;
  isConnected(): boolean;
  getBotClientID(): string;
  getBotClient(): Client;
  getNick(): string;
  getChannelByID(id: string): Channel | undefined;
  getCurrentChannel(): Channel;
  getChannelByName(name: string): Channel | undefined;
  getChannelsByName(name: string): Channel[];
  getChannelCount(): number;
  getChannels(): Channel[];
  getClients(): Client[];
  getClientByID(id: string): Client | undefined;
  getClientByName(name: string): Client | undefined;
  getClientByNick(nick: string): Client | undefined;
  getClientByUniqueID(uniqueID: string): Client | undefined;
  getClientByUID(uniqueID: string): Client | undefined;
  chat(msg: string): void;
  createChannel(channelParams: ChannelParams): Channel;
  getServerGroupByID(id: string): ServerGroup;
  getChannelGroupByID(id: string): ChannelGroup;
  getServerGroups(): ServerGroup[];
  getChannelGroups(): ChannelGroup[];
  extended(): BackendDiscord | BackendTeamspeak;
}

interface BackendDiscord { }
interface BackendTeamspeak { }
