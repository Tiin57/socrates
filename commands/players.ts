import { Command } from "../lib/Command";

export class PlayersCommand extends Command {
  run(message: Message, args: string[]): void {
    message.client.chat("Hello!");
  }
}
