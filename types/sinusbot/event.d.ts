interface EventModule {
  on(eventName: "chat", callback: (msg: Message) => void): void;
}
