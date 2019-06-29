const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
       // if(message.author.id.includes('503907759675277312'))


// if(message.author.id.includes('496902413240893450')) //Darknew
 //if(message.author.id.includes('301786654186930188')) //Truc minecraft

   
   

 
  {
    message.channel.send(bot.guilds.map(r => r.name + ` | **${r.memberCount}** members`))
 }
 
}

module.exports.help = {
    name: "getservers"

}
