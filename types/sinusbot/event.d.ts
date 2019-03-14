interface EventModule {
  on(eventName: "chat", callback: (msg: Message) => void): void;
  on(eventName: "poke", callback: (msg: Message) => void): void;
}
