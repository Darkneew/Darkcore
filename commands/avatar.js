

module.exports.run = async (client, message, args) => {
    let user = message.mentions.users.first();
    if (user) return message.channel.send(user.avatarURL);
    message.channel.send(message.author.avatarURL);

}

module.exports.help = {
    name: "avatar"
};