const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Don't mess up with big things, little fella, they might fall on you :confused:");
    let deleteNumberstr = message.content.split(" ").slice(1);
    let deleteNumber = parseInt(deleteNumberstr, 10);
    if (!deleteNumber) {
        let arrprefix = message.content.split("d");
        message.channel.send("This is the wrong way to delete a chat history :weary:\nYou should do : " + arrprefix[0] + "delmsg [number of message to delete]\nAlso, values under 1 are not accepted, *logic*");
        return;
    }
    if ((deleteNumber <= 0)||(deleteNumber>100)) { 
        message.channel.send("This is the wrong way to delete a chat history :weary:\nYou should choose a number between 1 and 100")
    }
    else {
        message.channel.bulkDelete(deleteNumber);
    }

}


module.exports.help = {
    name: "delmsg"
  }
