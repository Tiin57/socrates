class PlayersCommand extends Command {
  static prefix = "players";
  run(message: Message, args: string[]): void {
    message.client.chat("Hello!");
  }
}
