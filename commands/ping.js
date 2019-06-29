const Discord = require("discord.js");


module.exports.run = async (bot, message, args) => {
    message.channel.send("Ping-pong... Ping-pong... Pinging...") 
			.then((msg) => { 
				msg.edit(":clock2: Ping: " + (Math.floor(Math.round(bot.ping))) + 'ms \nSo, am I not the fastest bot you\'ve ever seen?')
})}
 
module.exports.help = {
  name: "ping"
}