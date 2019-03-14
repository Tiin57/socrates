registerPlugin({
  name: "Socrates",
  author: "Tiin57 <tiin57@gmail.com>",
  description: "Various commands and such",
  version: "1.0.0"
}, (_, config) => {
  const engine = require("engine");
  const event = require("event");
  const http = require("http");
  const commandPrefix = engine.getCommandPrefix();

  const commands = {
    me: ({ client }: Message) => {
      client.chat(`Your information:\nUnique ID: ${client.uniqueId()}\nDatabase ID: ${client.databaseID()}\nTemporary ID: ${client.id()}`);
    },
    players: ({ channel, client }: Message, args: string[]) => {
      const target = channel || client;
      const serverName = ["civilcity", "cityrp", "cc"].some(n => n === (args[0] || "").toLowerCase())
        ? "CityRP" : "DarkRP";
      const port = serverName === "DarkRP" ? 27015 : 27016;
      http.simpleRequest({
        url: `https://www.gametracker.com/server_info/cg.civilservers.net:${port}`
      }, (err, res) => {
        if (err) {
          return target.chat(`Couldn't get number of players for ${serverName}: ${err}`);
        }
        const count = res!.data.toString().match(/<span id="HTML_num_players">(\d+)<\/span>/)![1];
        target.chat(`There are ${count} players on ${serverName} right now.`);
      });
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
