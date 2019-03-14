registerPlugin({
  name: "Socrates",
  author: "Tiin57 <tiin57@gmail.com>",
  description: "Various commands and such",
  version: "1.0.0"
}, (_, config) => {
  const backend = require("backend");
  const engine = require("engine");
  const event = require("event");
  const http = require("http");
  const commandPrefix = engine.getCommandPrefix();

  const commands = {
    me: ({ client }: Message) => {
      client.chat(`Your information:\nUnique ID: ${client.uniqueId()}\nDatabase ID: ${client.databaseID()}\nTemporary ID: ${client.id()}`);
    },
    players: (_: Message, target: Channel | Client, args: string[]) => {
      const serverName = ["civilcity", "cityrp", "cc"].some(n => n === (args[0] || "").toLowerCase())
        ? "CityRP" : "DarkRP";
      const port = serverName === "DarkRP" ? 27015 : 27016;
      const url = `https://www.gametracker.com/server_info/cg.civilservers.net:${port}`;
      http.simpleRequest({ url }, (err, res) => {
        if (err || res!.statusCode !== 200) {
          return target.chat(`Couldn't get number of players for ${serverName}: ${err}`);
        }
        // this environment would scream if I tried to use a proper DOM library, so gross regex is my only resort
        const count = res!.data.toString().match(/<span id="HTML_num_players">(\d+)<\/span>/)![1];
        target.chat(`There are ${count} players on ${serverName} right now. ([URL=${url}]More information[/URL])`);
      });
    },
    reload: ({ client }: Message, target: Channel | Client) => {
      // TODO: improve permissions checking
      if (client.databaseID() !== "110890") {
        return target.chat("You are not authorized to reload.");
      }
      target.chat(`User ${client.nick()} (${client.databaseID()}) requested a reload.`);
      engine.reloadScripts();
    },
    set: ({ channel, client }: Message, target: Channel | Client, args: string[]) => {
      // TODO: improve permissions checking
      if (client.databaseID() !== "110890") {
        return target.chat("You are not authorized to reload.");
      }
      if (args.length < 2) {
        return target.chat("Usage: set <field> <value>");
      }
      const bot = backend.getBotClient();
      const field = args[0].toLowerCase();
      const value = args.slice(1).join(" ");
      switch (field) {
        case "desc":
        case "description":
          bot.setDescription(value);
          break;
        case "nick":
        case "nickname":
          engine.setNick(value);
          break;
        case "avatar":
          engine.setAvatarFromURL(value);
          break;
        default:
          return target.chat(`Don't know how to set ${field}.`);
      }
      target.chat(`Successfully set ${field} to "${value}"`);
    }
  };

  const commandPrefixes = Object.keys(commands) as (keyof typeof commands)[];
  const onMessage = (message: Message) => {
    const prefix = commandPrefixes.filter(prefix =>
      // ends up looking like /^\~players/
      new RegExp("^\\" + commandPrefix + prefix).test(message.text)
    )[0];
    if (!prefix) return;
    const prefixTokenCount = prefix.split(" ").length; // prefix could have spaces, I guess
    const args = message.text.replace(/\[\/?URL\]/gi, "").split(" ").slice(prefixTokenCount);
    return (commands[prefix])(message, message.channel || message.client, args);
  };
  event.on("chat", onMessage);
  event.on("poke", onMessage);
});
