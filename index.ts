registerPlugin({
  name: "Socrates",
  author: "Tiin57 <tiin57@gmail.com>",
  description: "Various commands and such",
  version: "1.0.0"
}, (_, config) => {
  const commands = [
    PlayersCommand
  ];
  const engine = require("engine");
  const event = require("event");
  const commandPrefix = engine.getCommandPrefix();
  event.on("chat", message => {
    const Command = commands.filter(c =>
      new RegExp("^\\" + commandPrefix + c.prefix).test(message.text)
    )[0];
    if (!Command) return;
    const prefixTokenCount = Command.prefix.split(" ").length;
    const args = message.text.split(" ").slice(prefixTokenCount);
    return new Command().run(message, args);
  });
});
