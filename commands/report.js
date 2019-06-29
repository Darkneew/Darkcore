const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);


   message.channel.send(`Hey ${rUser}, You want to know something ? ${message.author} try to report you for ${rreason} **GO SPAM HIM IN DM !**`)


    message.delete().catch(O_o=>{});


}
 
module.exports.help = {
  name: "report"
}