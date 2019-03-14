import { PlayersCommand } from "./commands/players";

registerPlugin({
  name: "Socrates",
  author: "Tiin57 <tiin57@gmail.com>",
  description: "Various commands and such",
  version: "1.0.0"
}, (_, config) => {
  const commands = [
    PlayersCommand
  ];
  commands.some(a => a.toString() === "2");
});
