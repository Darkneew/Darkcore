    
const Discord = module.require("discord.js")
const weather = require("weather-js")

module.exports.run = async (bot, message, args) => {

    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) { //en co
        if(err) message.channel.send(err)

            if(result.length === 0) {
                message.channel.send("Mmm, man we don't live in the same planet...")
                return;
            }
        var current = result[0].current 
        var location = result[0].location 

     
        let embed = new Discord.RichEmbed()
           .setDescription(`**${current.skytext}**`) 
           .setAuthor(`So, in ${current.observationpoint}`)
           .setThumbnail(current.imageUrl) 
           .setColor(0x00AE86) 
           .addField("Timezone", `UTC${location.timezone}`, true) 
           .addField("Degree Type", location.degreetype, true) 
           .addField("Temperature", `${current.temperature}`, true)
           .addField("Feels like", `${current.feelslike} Degrees`, true)
           .addField("Winds", current.winddisplay, true)
           .addField("Humidity", ` ${current.humidity}%`, true)
           .addField("Day", `${current.day}`, true)
           .addField("Date", `${current.date}`, true)
    
           message.channel.sendEmbed(embed)

    });

    message.delete();
    
    }
module.exports.help = {
    name: "weather"
}