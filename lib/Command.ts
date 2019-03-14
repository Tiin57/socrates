export abstract class Command {
  abstract run(message: Message, args: string[]): void;
}
