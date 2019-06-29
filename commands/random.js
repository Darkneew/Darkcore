const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    {
    let arrprefix = message.content.split("r");
    let prefix = arrprefix[0];
    if(message.content === prefix + 'random') {
        let numéro = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:"];
    
        let resultat = Math.floor((Math.random() * numéro.length));
    
        let déembed = new Discord.RichEmbed()
        
         .setColor("#FF9900")
         .addField("Mmmm... number:", numéro [resultat]);
    
         message.channel.send(déembed);
    }
    }       

}


module.exports.help = {
    name: "random"

}
