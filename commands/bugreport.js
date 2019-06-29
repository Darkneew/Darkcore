const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = async (bot, message, args) => {
    const botconfig = JSON.parse(fs.readFileSync("./botconfig.json", "utf8"));
    const bugreportchannel = (botconfig.bugreportchannel);
    const bgchannel = bot.channels.get(bugreportchannel);
    let prefix = message.content.split("b");
    if (args.length < 3) return message.channel.send('Are you certain of your use of the command? Because I am not :confused:\nThe correct use is '+ prefix[0] + 'bugreport [bug] [concerned command] [description (as many words as you want)]');
    let bug = args[0];
    let command = args[1];
    let user = message.author.username
    let report = args.slice(2).join(" ");
    let embed = new Discord.RichEmbed()
    .setColor(0xe00606)
    .setTitle("A bug has been reported")
    .addField("Reporter", user)
    .addField("Bug", bug)
    .addField("Concerned command", command)
    .addField("Description", report);
    bgchannel.send(embed);
    message.channel.send('Your bug has been reported  :white_check_mark: \nThanks for helping us improve the bot')
}



module.exports.help = {
    name: "bugreport"
  }