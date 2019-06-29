//Dependencies
const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require ('fs');

//Config
const botconfig = require('./botconfig.json');
bot.login (botconfig.token);

//Constants
const database = require('./database.json');
const jokes = (database.jokes);
const geekjokes = (database.geekjokes);
const memes = (database.memes);
const geekmemes = (database.geekmemes);
const usage = (database.usage);
const letters = (database.letters);
const unicode = (database.unicode);

// PREFIX
function setprefix(message) {
    let prefixes = JSON.parse(fs.readFileSync("./prefix.json"));
    const basicprefix = (botconfig.prefix); 
    if (!prefixes[message.guild.id]) return basicprefix;
    let prefix = prefixes[message.guild.id].prefixes;
    return prefix;
}

// BOTNAME
function setname(message) {
    let names = JSON.parse(fs.readFileSync("./names.json"));
    const basicname = (botconfig.botname);
    if (!names[message.guild.id]) return basicname;
    let name = names[message.guild.id].name;
    return name; 
}


//Command file
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, Files) =>{
if(err) console.log(err);
  
let jsfile = Files.filter(f => f.split(".").pop() ==="js")
if(jsfile.length <= 0){
console.log("commande introuvable");
return;
}
  
jsfile.forEach((f, i ) => {
let props = require(`./commands/${f}`);
console.log(`${f} loaded!`); 
bot.commands.set(props.help.name, props);
})
})

bot.on("message", async message => {
let prefix = setprefix(message);
if (message.content.startsWith(prefix)) {
if(message.author.bot) return;
if(message.channel.type === "dm")return;

let messageArray = message.content.split(" "); 
let cmd = messageArray[0];
let args = messageArray.slice(1);
let commandfile = bot.commands.get(cmd.slice(prefix.length));
if(commandfile) commandfile.run(bot,message, args);

}});

bot.on('ready', () => {
    console.log("Alleluia everything works")
    bot.user.setActivity("himself", {type: 3});
});

//JOINING A SERVER 
bot.on("guildCreate", guild => {
    console.log("Added to a new server, named " + guild.name);
    if (guild.systemChannelID)  {var gchannel = bot.channels.get(guild.systemChannelID);}
    else if (guild.afkChannelID) {var gchannel = bot.channels.get(guild.afkChannelID) }
    if (gchannel) {
        let nembed = new Discord.RichEmbed()
        .setTitle("Hello there :wave:")
        .setColor(0xd4266c)
        .addField("I am Darkcore", "At your service!")
        .addField("How to use me?", "Right now, my prefix is '/', but you can change it with the command */setnewprefix*")
        .addField("To call my help", "Just enter */help*")
        .addField("To talk to me", "Start your sentence with my name, which is currently Darkcore.");
        gchannel.send(nembed);
    }
    else {console.log('Couln\'t send the message')} ;
    let user = bot.user;
    let Tmember = guild.members.find(member => member.user === user);
    guild.createRole({
        name: 'Server manager',
        color: '0xff0040',
        hoist: 'true',

    }).then((Nrole) => {
        if (!Tmember) return console.log('Couln\'t find the member');
        if (!Nrole) return console.log('Couldn\'t find the role');
        Tmember.addRole(Nrole);
    }
    )    
    guild.createChannel('shooting-range', { type: 'text' }).then((Tchannel) => {
    Tchannel.send("Here, you can shoot at friends or ennemies, no one wil care\nJust do `/shoot [someone]` to shoot them");
    })
    guild.createRole({
        name: 'No0bs',
        color: '31aa08',

    });
    guild.createRole({
        name: 'Not too bad',
        color: '0xc3c309',
    });
    guild.createRole({
        name: 'Pros',
        color: 'aa3109',
    });
    guild.createRole({
        name: 'Gods',
        color: 'cc0000',
    });
});

// THE CHAT BOT

bot.on('message', message => {
    var botname = setname(message);
    if (message.content.startsWith(botname)) {
    var prefix = setprefix(message);
    let namelength = botname.length;
    var text = message.content.substr(namelength + 1);
    
    /* Le help */
    
    
    if ((text.indexOf("help")>=0)||(text.indexOf("explain")>=0)||((text.startsWith('how'))&&(!text.startsWith('how are you?')))) {
      if (text.indexOf("this bot")>= 0) {
        message.channel.send("I am happy to know that people still ask questions about me! I tought I had become a lonesome bot! So, you can get the servers I'm in with *"+prefix+'getservers*, or you can get my ping with *'+prefix+'ping*. Also, you can make me say things to feel yourself less lonely, by simply writing *'+prefix+"say [sentence]*.")
    
      }
        
     else if ((text.indexOf('how old')>= 0 )||(text.indexOf('your age')>=0) ) {
        message.channel.send('I am really young, even for a bot. But that isn\'t a usefull question. One would be *What\'s your age?*');
    }
    
      else if (text.indexOf("fun")>=0) {
    message.channel.send("Do you really ask me how to have fun??? Just talk to me bro ```I am fun```\nBut seriously, I can tell you **jokes** or **geek jokes** if you want, or show you some **memes**. The **geek** version also exists for the memes.\nThere is also a command to play around with, and for jokes: *"+prefix+"yomama*")    
      }

      else if (text.indexOf("prefix")>=0) {
        message.channel.send("Right now, the prefix on this server is '"+prefix+"', but you can easily change it with the command *"+prefix+"setnewprefix*.")
          }

      else if (text.indexOf("game")>=0) {
        message.channel.send("Ahhhhhhhhhhhh... I see someone here knows how to have fun :smirk:. So, it is simple: To throw a dice, do *"+prefix+"random*. To play hangman, enter *"+prefix+"hangman [channel id] [word]*. To do a quiz, write *"+prefix+"quiz*.\nEasy, see?")
       }

      else if (text.indexOf("useful stuff")>=0) {
          message.channel.send("You want to know about useful stuff?? But I am totally useless. I can just do some random stuff, or fun **games**.\nNo, but seriously, I can **delete messages** with the command *"+prefix+"delmsg [number of messages to delete]*, I can show someone's avatar with the command *"+ prefix +"avatar [someone (optional)]*, I can talk to you about this server, with *"+prefix+"serverinfo*, and finally, I can report a user or a bug with the commands *"+prefix+"report [user] [reason]* and *"+prefix+"bugreport [bug] [bugged_command] [description]*")
      }

      else if (text.indexOf('weather')>=0) {
        message.channel.send("If you want to know anything about the weather, just enter *" + prefix + "weather [location]* to know the weather there.");
    }
      
      else if (text.indexOf('roleplay')>=0) { 
        message.channel.send("The roleplay on this bot is pretty simple. Send messages and you'll go up. Get shot and you'll go down. To shoot someone, it's pretty simple : just do *"+prefix+"shoot [someone]*. \nYou can see levels at any moment with the command *"+prefix+"*level [someone (optional)]")
      }

      else if (text.indexOf('delete')>= 0 && text.indexOf('message')>=0) {
        message.channel.send("To delete message, it is simple. Just enter \"" + prefix + "delmsg [number]\" to delete this amount of message. However, you must have the permission to do that.");
    }

        else if (text.indexOf('your name')>= 0 ) {
        message.channel.send('My name is '+ botname + ', but you can change it with the command *' + prefix + 'setname*') 
    }    
    
    else {
        message.channel.send("What do you want me to tell you, more precisely? Something about **fun** things I can do, or about the **games** implemented on this bot? Or a few commands about **this bot**? Or simply how the **roleplay** works? Also, you can ask me some usual stuff, such as my **age** or the **weather**. I also know some **useful stuff**, such as how to **delete a message**. But the most useful thing to know is how to change my **prefix**!" );
    
      }
    }
    
    /*LA com de base */
    
    else if (text == '') {
      message.channel.send("Yes?");
    }
    
    else if (text.indexOf('how are you')>=0) {
      message.channel.send("I don't feel my legs anymore, but I am starting to get used to it. Other than that I'm fine. And you?");
    }
    
    else if ((text.indexOf("hi ")>= 0)||(text.indexOf("hey ")>=0)||(text.indexOf("hello ")>=0)||(text.endsWith('hi'))||(text.endsWith('hi?'))||(text.endsWith('hey?'))||(text.endsWith('hello?'))||(text.endsWith('hey'))||(text.endsWith('hello'))) {
    message.channel.send("Hey!");
    }
    else if (text.indexOf('where')>= 0 && text.indexOf('live')>=0) {
        message.channel.send('Well, I live in the cloud. There is a nice view up there, and mostly, it is usefull when I am asked the weather');
    }

    
    /* Les commandes speciales */
    else if ((text.indexOf("joke ") >= 0)||(text.indexOf("jokes ")>=0)||(text.endsWith('joke'))||(text.endsWith('joke?'))||(text.endsWith('jokes?'))||(text.endsWith('jokes'))) {
    if (text.indexOf("geek") >= 0) {
    let arrlength = geekjokes.length;
    message.channel.send(geekjokes[Math.floor(Math.random() * arrlength)]);
    }
    
    else {
    let arrlength = jokes.length;
    message.channel.send(jokes[Math.floor(Math.random() * arrlength)]);
    }
    }
    
    else if ((text.indexOf("meme ")>=0)||(text.indexOf("memes ")>=0)||(text.endsWith("meme"))||(text.endsWith('meme?'))||(text.endsWith('memes?'))||(text.endsWith('memes'))) {
      if (text.indexOf("geek")>=0) {
        let arrlength = geekmemes.length;
    message.channel.send(geekmemes[Math.floor(Math.random() * arrlength)]);
      }
    
      else {
        let arrlength = memes.length;
    message.channel.send(memes[Math.floor(Math.random() * arrlength)]);
    }
    }
    
    else if (text.indexOf("this bot")>= 0) {
        message.channel.send("I am happy to know that people still ask questions about me! I tought I had become a lonesome bot! So, you can get the servers I'm in with *"+prefix+'getservers*, or you can get my ping with *'+prefix+'ping*. Also, you can make me say things to feel yourself less lonely, by simply writing *'+prefix+"say [sentence]*.")
    
      }
    
     else if ((text.indexOf('how old')>= 0 )||(text.indexOf('your age')>=0) ) {
        message.channel.send('I am really young, even for a bot. But that isn\'t a usefull question. One would be *What\'s your age?*');
    }
    
      else if (text.indexOf("fun")>=0) {
    message.channel.send("Do you really ask me how to have fun??? Just talk to me bro ```I am fun```\nBut seriously, I can tell you **jokes** or **geek jokes** if you want, or show you some **memes**. The **geek** version also exists for the memes.\nThere is also a command to play around with, and for jokes: *"+prefix+"yomama*")    
      }

      else if (text.indexOf("prefix")>=0) {
        message.channel.send("Right now, the prefix on this server is '"+prefix+"', but you can easily change it with the command *"+prefix+"setnewprefix*.")
          }

      else if (text.indexOf("game")>=0) {
        message.channel.send("Ahhhhhhhhhhhh... I see someone here knows how to have fun :smirk:. So, it is simple: To throw a dice, do *"+prefix+"random*. To play hangman, enter *"+prefix+"hangman [channel id] [word]*. To do a quiz, write *"+prefix+"quiz*.\nEasy, see?")
       }

      else if (text.indexOf("useful stuff")>=0) {
          message.channel.send("You want to know about useful stuff?? But I am totally useless. I can just do some random stuff, or fun **games**.\nNo, but seriously, I can **delete messages** with the command *"+prefix+"delmsg [number of messages to delete]*, I can talk to you about this server, with *"+prefix+"serverinfo*, and finally, I can report a user or a bug with the commands *"+prefix+"report [user] [reason]* and *"+prefix+"bugreport [bug] [bugged_command] [description]*")
      }

      else if (text.indexOf('weather')>=0) {
        message.channel.send("If you want to know anything about the weather, just enter *" + prefix + "weather [location]* to know the weather there.");
    }
      
      else if (text.indexOf('roleplay')>=0) { 
        message.channel.send("The roleplay on this bot is pretty simple. Send messages and you'll go up. Get shot and you'll go down. To shoot someone, it's pretty simple : just do *"+prefix+"shoot [someone]*. \nYou can see levels at any moment with the command *"+prefix+"*level [someone (optional)]")
      }

      else if (text.indexOf('delete')>= 0 && text.indexOf('message')>=0) {
        message.channel.send("To delete message, it is simple. Just enter \"" + prefix + "delmsg [number]\" to delete this amount of message. However, you must have the permission to do that.");
    }

        else if (text.indexOf('your name')>= 0 ) {
        message.channel.send('My name is '+ botname + ', but you can change it with the command *' + prefix + 'setname*') 
    }    


    else if (text.startsWith('thank')) {
        message.channel.send("No worries :slight_smile:")
      }  
      
    /*else */
    else {
    message.channel.send("Pliz speak english :upside_down:");
    }
    
    }});


    // THE HANGMAN
    
    var games = [];
    const stages = [`\`\`\`
/---|
|   
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|   |
| 
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|
|
\`\`\`
`, `\`\`\`
/---|
|   o
|  /|\\
|  /
|
\`\`\`
`, `\`\`\`
/---|
|   o ~ ur a noob
|  /|\\
|  / \\
|
\`\`\`
`];    
    
    function generateMessage(phrase, guesses) {
        var s = "";
        for(var i = 0; i < phrase.length; i++) {
            if(phrase[i] == ' ')
                s += " ";
            else {
                var c = phrase[i];
                if(guesses.indexOf(c) == -1)
                    c = "\\_";
                s += "__" + c + "__ ";
            }
        }
        return s;
    }
    
    function nextLetter(message, index, word) {
        message.react(letters[index]).then(r => {
            index++;
            if(index < letters.length) {
                if(index == 13) {
                    message.channel.send(generateMessage(word, [])).then(m => {
                        games.push({
                            stage: 0,
                            msg0: message,
                            msg1: m,
                            phrase: word,
                            guesses: []
                        });
                        nextLetter(m, index);
                    });
                } else {
                    nextLetter(message, index, word);
                }
            }
        });
    }
    
    bot.on('messageReactionAdd', (reaction, user) => {
        var msg = reaction.message;
        if(!user.bot) {
            for(var i = 0; i < games.length; i++) {
                var game = games[i];
                if((msg.id == game.msg0.id || msg.id == game.msg1.id) && game.stage < stages.length) {
                    var letter = unicode[letters.indexOf(reaction.emoji.name)];
                    
                    reaction.fetchUsers().then(usrs => {
                        var reactors = usrs.array();
                        var remove_next = function(index) {
                            if(index < reactors.length)
                                reaction.remove(reactors[index]).then(() => remove_next(index + 1));
                        };
                        
                        remove_next(0);
                    });
                    
                    if(game.guesses.indexOf(letter) == -1) {
                        game.guesses.push(letter);
                        if(game.phrase.indexOf(letter) == -1) {
                            game.stage ++;
                            game.msg0.edit(stages[game.stage]);
                        } else {
                            var sik = true;
                            for(var j = 0; j < game.phrase.length; j++) {
                                var c = game.phrase[j];
                                if(c != ' ' && game.guesses.indexOf(c) == -1) {
                                    sik = false;
                                }
                            }
                            
                            if(sik) {
                                game.msg0.edit(stages[game.stage].replace("o", "o ~ ur not dead.. for now"));
                            }
                            
                            game.msg1.edit(generateMessage(game.phrase, game.guesses));
                        }
                    }
                }
                games[i] = game;
            }
        }
    });
    
    bot.on('message', msg => {
        let prefix = setprefix(msg);
        if(msg.content.startsWith(prefix + "hangman")) {
            var words = msg.content.split('\n')[0].split(' ');
            if(words.length < 2) {
                msg.reply(usage);
            } else {
                var channel = bot.channels.find('id', words[1]);
                var word = words.slice(2).join(' ').toLowerCase().replace(/[^a-z\s:]/g, '');
                if(channel != null) {
                    msg.delete().catch();
                    channel.send(stages[0]).then(m => {
                        nextLetter(m, 0, word);
                    });
                } else {
                    msg.reply("Bruuuu, there is no channel with the id `" + words[1] + "` existing on earth! \n" + usage);
                }
            }
        }
    });

// GREETINGS 
bot.on('message', message => {
    let msg = message.content.toLowerCase();
    let msglength = msg.length
    if (message.author.bot) return;
    if ((msg.startsWith('hi') || msg.startsWith('hey') || msg.startsWith('hello'))&&(msglength < 10)) {
        message.channel.send('Hi!')
    }
});


// ANTI SWEARING 
bot.on('message', message => {
    let msg = message.content.toLowerCase();
    if ((msg.indexOf(' fuck') >= 0)||(msg.indexOf(' shit') >= 0)||(msg.indexOf(' ass') >= 0)||(msg.indexOf(' arse') >= 0)||(msg.indexOf(' bastard ') >= 0)||(msg.indexOf(' slut ') >= 0)) {
        let correction = msg.split(' fuck').join(' *heck*');
        correction = correction.split(' shit').join(' *heck*');
        correction = correction.split(' ass').join('* [you know where]*');
        correction = correction.split(' arse').join('* [you know where]*');
        correction = correction.split(' bastard ').join(' *bad person* ');
        correction = correction.split(' slut ').join(' *bad person* ');
        message.channel.send('Sorry, I\'m not sure I heard well. Did you mean:\n'+ correction);
    }


});



// THE ROLEPLAY 

  // THE LEVEL SYSTEM

  
  bot.on('message', message => {
    let levels = JSON.parse(fs.readFileSync("./levels.json", "utf8"));
    if (message.author.bot) return; 
    if (!levels[message.author.id]) levels[message.author.id] = {
        xp: 0,
        level: 1
      };
    levels[message.author.id].xp += 2;
    let userInfo = levels[message.author.id];
    let xpneeded = 10 * userInfo.level
    if(userInfo.xp > xpneeded) {
        userInfo.level++;
        userInfo.xp = 0;
        message.reply("Congratulations, you just leveled up. Your current level is now "+ userInfo.level);
    }
    fs.writeFile("./levels.json", JSON.stringify(levels), (x) => {
        if (x) console.error(x)
      });

});

// THE SHOOT
bot.on('message', message => {
    let prefix = setprefix(message);
    if (message.content.startsWith(prefix + 'shoot')) {
    const args = message.content.substr(prefix.length);
    let TUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!TUser) return message.channel.send('Stop shooting at nowhere, this person doesn\'t exist! You are wasting your ammos');
    let corps = ["in his right hand", "in his left leg", "inside his stomach", "inside his heart", "in his head", "but avoid it"];
    let cible = Math.floor((Math.random() * corps.length));
    message.channel.send(`${TUser} got a bullet ${corps[cible]}`);
    
    let user = message.mentions.users.first();
    if (user.bot) return message.channel.send('You know bots are immortal, right?\nBut anyway, if you want to practice shooting, go ahead...');
    /*let levels = JSON.parse(fs.readFileSync("./levels.json", "utf8"));
    if (!levels[user.id]) return message.channel.send('Let him rest in peace a bit! He just joined the server, poor little boy');
    if (levels[user.id].xp = 0) return message.channel.send(`Rip, he doesn't have any xp left`);
    levels[user.id].xp--;
    fs.writeFile("./levels.json", JSON.stringify(levels), (x) => {
        if (x) console.error(x)
      });*/
    }});

    // SET NEW PREFIX

    bot.on('message', message => {
        let prefix = setprefix(message);
        if (message.content.startsWith(prefix + 'setnewprefix')) {
        const args = message.content.split(" ").slice(1);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You need to have permissions");

        if (!args[0] ) return message.reply("Incorrect usage : setnewprefix + prefix");
        let fprefixes = JSON.parse(fs.readFileSync("./prefix.json"));
        if (!fprefixes[message.guild.id]) {
        fprefixes[message.guild.id] = {
        prefixes: args[0]
        };}
        else {
        fprefixes[message.guild.id].prefixes = args[0];
        }
        fs.writeFile("./prefix.json", JSON.stringify(fprefixes), (err) =>{
        if(err) console.log(err)
        });
        let sembed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("All done")
        .setDescription(`The new prefix is ${args[0]} for this server`);
        message.channel.send(sembed);
        //console.log(`{message.author.username} à modifié le préfix  avec le préfix : ${prefixes} `);
        
    }});




    //SETNAME

    bot.on('message', message => {
        let prefix = setprefix(message);
        if (message.content.startsWith(prefix + 'setname')) {
        const args = message.content.split(" ").slice(1);
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You need to have permissions");

        if (!args[0] ) return message.reply("If you want to rename me, at least do it well! The right use is "+prefix+"setname + name");
        let fnames = JSON.parse(fs.readFileSync("./names.json"));
        if (!fnames[message.guild.id]) {
        fnames[message.guild.id] = {
        name: args[0]
        };}
        else {
        fnames[message.guild.id].name = args[0];
        }
        fs.writeFile("./names.json", JSON.stringify(fnames), (err) =>{
        if(err) console.log(err)
        });
        let sembed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("All done")
        .setDescription(`My new name is ${args[0]} for this server`);
        message.channel.send(sembed);
        //console.log(`{message.author.username} à modifié le préfix  avec le préfix : ${prefixes} `);
        
    }});
