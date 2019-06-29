const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) {message.reply("No no no... You won't do that...");}
    else {
    phrase = message.content.split(" ").slice(1).join(" ")
    message.channel.send(phrase);
    message.delete()
}}
 
module.exports.help = {
  name: "say"
}