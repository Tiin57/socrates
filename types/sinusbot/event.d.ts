declare module "event" {
  export function on(eventName: "chat", callback: (msg: Message) => void): void;
}
