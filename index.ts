const commands = {
  players: (message: Message, args: string[]) => {
    message.client.chat("Hello! " + JSON.stringify(args));
  }
};

registerPlugin({
  name: "Socrates",
  author: "Tiin57 <tiin57@gmail.com>",
  description: "Various commands and such",
  version: "1.0.0"
}, (_, config) => {
  const engine = require("engine");
  const event = require("event");
  const commandPrefix = engine.getCommandPrefix();
  const commandPrefixes = Object.keys(commands) as (keyof typeof commands)[];
  event.on("chat", message => {
    const prefix = commandPrefixes.filter(prefix =>
      new RegExp("^\\" + commandPrefix + prefix).test(message.text)
    )[0];
    if (!prefix) return;
    const prefixTokenCount = prefix.split(" ").length;
    const args = message.text.split(" ").slice(prefixTokenCount);
    return (commands[prefix])(message, args);
  });
});
