const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;


        fs.readdir("./commands/", (err, files) => {
        let arrprefix = message.content.split("h");
        let prefix = arrprefix[0];
        let jsfiles = files.filter(f => f.split(".").pop() === "js");
        let serverembed = new Discord.RichEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor('DARKCORE - Prefix: ' + `${prefix}`)
        .setTitle((jsfiles.length +2) + " commands:")
        .addField("The *about ME* commands:", "ping, getservers, setnewprefix, setname, stats")
        .addField("The useful commands - *But who need that?*","serverinfo, delmsg, report, bugreport, avatar, rate, roleinfo, userinfo")
        .addField("The *If you don't have any friends* commands", "weather, hangman, random, say, yomama, quiz, flip, gif, morse, pepe")
        .addField("The roleplay commands, to show your dominance", "shoot, level")
        .addField("The commands to talk to me :smiley:","start your sentence with Darkcore (words in bold mean I can detect them)")
      message.channel.send(serverembed);

})};
module.exports.help = {
    name: "help"
};
