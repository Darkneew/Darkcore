const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = async (bot, message, args) => {
    let levels = JSON.parse(fs.readFileSync("./levels.json", "utf8"));    
    let userInfo = levels[message.author.id];
    let xpneeded = 10 * userInfo.level
        let member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setTitle("Your stats")
        .setColor(0x7ab87a)
        .addField("Level ", userInfo.level)
        .addField("XP ", userInfo.xp+"/"+ xpneeded);
        if(!member) return message.channel.send(embed);
        if (!levels[member.id]) return message.channel.send('This noob don\'t even have a level, so stop bullying him!');
        let memberInfo = levels[member.id];
        let hisxpneeded = 10 * memberInfo.level
        let embed2 = new Discord.RichEmbed()
        .setTitle("His stats")
        .setColor(0x3e743e)
        .addField("Level", memberInfo.level)
        .addField("XP", memberInfo.xp+"/" + hisxpneeded);
        message.channel.send(embed2)
    }


module.exports.help = {
    name: "level"
  }