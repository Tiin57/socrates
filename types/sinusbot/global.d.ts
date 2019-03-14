interface Client {
  name(): string;
  nick(): string;
  phoneticName(): string;
  id(): string;
  uid(): string;
  uniqueId(): string;
  databaseID(): string;
  country(): string;
  description(): string;
  setDescription(description: string): void;
  isSelf(): boolean;
  isRecording(): string;
  isMuted(): boolean;
  isDeaf(): boolean;
  isAway(): boolean;
  getServerGroups(): ServerGroup[];
  getChannelGroup(): ChannelGroup;
  getAwayMessage(): string;
  getPing(): number;
  getIPAddress(): string;
  getOnlineTime(): number;
  getIdleTime(): number;
  getPacketLoss(): number;
  getBytesReceived(): number;
  getBytesSent(): number;
  getTotalConnections(): number;
  getCreationTime(): number;
  getChannels(): Channel[];
  getAudioChannel(): Channel;
  getURL(): string;
  equals(otherClient: Client): boolean;
  chat(msg: string): boolean;
  poke(msg: string): void;
  ban(time: number, msg: string): void;
  /** server */
  kick(msg: string): void;
  kickFromServer(msg: string): void;
  kickFromChannel(msg: string): void;
  addToServerGroup(group: ServerGroup | string | number): void;
  removeFromServerGroup(id: any, group: ServerGroup | string | number): void;
  moveTo(target: Channel, password?: string): void;
  setSubscription(val: boolean): void;
  getPlatform(): string;
  getVersion(): string;
  type(): ClientType;
}

declare enum ClientType {
  Query = 0,
  Normal = 1
}

interface Channel {
  id(): string;
  name(): string;
  parent(): Channel | null;
  position(): number;
  delete(): boolean;
  moveTo(parent: string | Channel, order: number): void;
  setName(name: string): void;
  type(): ChannelType;
  topic(): string;
  setTopic(topic: string): void;
  description(): string;
  setDescription(description: string): void;
  codec(): number;
  setCodec(codec: number): void;
  codecQuality(): number;
  setCodecQuality(codecQuality: number): void;
  maxClients(): number;
  setMaxClients(maxClients: number): void;
  maxFamilyClients(): boolean;
  setMaxFamilyClients(maxFamilyClients: boolean): void;
  isPermanent(): boolean;
  setPermanent(permanent: boolean): void;
  isSemiPermanent(): boolean;
  setSemiPermanent(semiPermanent: boolean): void;
  isDefault(): boolean;
  isPassworded(): boolean;
  isEncrypted(): boolean;
  setEncrypted(encrypted: boolean): void;
  equals(otherChannel: Channel): boolean;
  chat(msg: string): boolean;
  getClients(): Client[];
  getClientCount(): number;
  setSubscription(val: boolean): void;
  update(channelParams: ChannelParams): void;
  setChannelGroup(client: Client, channelGroup: ChannelGroup): void;
  getPermissions(): Permission[];
  addPermission(id: string): Permission;
}

interface ChannelGroup {
  id(): string;
  name(): string;
  icon(): string;
  getPermissions(): Permission[];
  addPermission(id: string): void;
}

interface ChannelParams { }

declare enum ChannelType {
  Voice = 0,
  Text = 1
}

interface Message {
  text: string;
  channel?: Channel;
  client: Client;
  mode: MessageMode;
}

declare enum MessageMode {
  Private = 1,
  Channel = 2,
  Server = 3
}

interface Permission {
  id(): string;
  name(): string;
  value(): number;
  skip(): boolean;
  negated(): boolean;
  setNegated(value: boolean): boolean;
  setSkip(value: boolean): boolean;
  setValue(value: number): boolean;
  save(): boolean;
  delete(): boolean;
}

interface ServerGroup {
  id(): string;
  name(): string;
  icon(): string;
  addClientByDatabaseId(client: Client | string | number): boolean;
  getPermissions(): Permission[];
  addPermission(id: string): void;
}

interface Track { }

interface User { }

interface Manifest<Variables extends string = ""> {
  name: string;
  author: string;
  description: string;
  version: string;
  autorun?: boolean;
  backends?: ("ts3" | "discord")[];
  enableWeb?: boolean;
  engine?: string;
  hidden?: boolean;
  requiredModules?: string[];
  vars?: {
    name: Variables;
    title: string;
    type: "string" | "password" | "strings" | "multiline" | "number" | "track" | "tracks" | "channel" | "select" | "select" | "checkbox" | "array";
    placeholder?: any;
    options?: string[];
    conditions?: {
      field: Variables;
      value: any;
    }[];
  }[];
  voiceCommands?: string[];
}

declare function registerPlugin<Variables extends string = "">(
  manifest: Manifest<Variables>,
  callback: (
    sinusbot: void,
    config: {[key in Variables]: any},
    manifest: Manifest<Variables>
  ) => void
): void;

declare function require(name: "engine"): EngineModule;
declare function require(name: "event"): EventModule;
