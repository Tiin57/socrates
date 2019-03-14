registerPlugin({
  name: "Socrates",
  author: "Tiin57 <tiin57@gmail.com>",
  description: "Various commands and such",
  version: "1.0.0"
}, (_, config) => {
  const engine = require("engine");
  const event = require("event");
  const commandPrefix = engine.getCommandPrefix();
  const commands = {
    me: ({ client }: Message) => {
      client.chat(`Your information:\nUnique ID: ${client.uid()}\nDatabase ID: ${client.databaseID()}\nTemporary ID: ${client.id()}`);
    },
    players: ({ client }: Message, args: string[]) => {
      client.chat("Hello! " + JSON.stringify(args));
    },
    reload: ({ channel, client }: Message) => {
      if (client.databaseID() !== "110890") {
        return client.chat("You are not authorized to reload.");
      }
      (channel || client).chat(`User ${client.nick()} (${client.databaseID()}) requested a reload.`);
      engine.reloadScripts();
    }
  };
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
