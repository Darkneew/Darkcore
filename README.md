# Darkcore
A convenient bot for everyday use, created for the Discord Hack Week

## Presentation
Darkcore is a simple-to-use useless but useful at the same time, omnipotent bot.

### His possibilities
With short commands, you can do all the stuff you could ever want on a server and manage it from this bot. 

Also, a chatting system has been integrated for him to speak to you easily, assuring a simple use and no complications.  So you can talk to this bot as well as you talk to me or your friends. 

Furthermore, this bot is not as any ordinary bot, and can distract yourself better than anyone. With his system of meme, jokes, geek-related jokes and meme, his "yo mamas", he can make you laught for more than an hour without circling through the same things.

Moreover, an hangman, a dice, a quiz and some other games are integrated in the bot,and a full roleplay system is implemented in the bot. 

Finally, he can even do moderation, with for exemple his anti-swearing

So there is really for everyone's taste, and anyone can find something to do. 


And all of this in the most uncommited, trivial, but so funny way possible. 

All of this customizable as you want.

All of this easy to implement and to use in any server.

All of this for you, simple user of discord, that don't want to spend 3 hours to find every bot needed for you server.

All of this at just one click of you.


# Installation
## How to get the bot on your server
If you just want to have this bot on your server, it is very simple, you just need to follow this [link](https://discordapp.com/oauth2/authorize?client_id=592760920648712192&scope=bot&permissions=8) and then, choose which server you want him on. 

And there he is!

He will then, directly on discord, tell you how to use him propely and in details.

## How to host the bot and install it on your pc
If you want to host it by yourself, it is a bit more complex. You will need to follow these steps

1. Download and un-zip the repo.

2. Install node.js (If you don't have it, you can get it [here.](https://nodejs.org/en/download/))

3. Open the cmd if you are using windows, or terminal if your using mac. To do that, if you are on windows, simply do ctrl+ r and enter cmd. If you are on mac, go on spotlight and search 'terminal'

4. Type in `cd` and drag and drop the Darkcore folder into the console. Make sure there is a space between `cd` and the path to your Darkcore folder.

5. Then, there is a few commands to type, each of them pretty simple : 
```batch
npm install node.js
npm install discord.js
npm install fs
npm install ms
npm install mn
npm install weather-js
npm install yo-mamma
npm install giphy-api
npm install cpu-stat
npm install moment
```

If it doesnt work make sure you have node.js. If it still doesnt work, restart your console.

6. Open your browser, go to [discord.com/developers](https://discordapp.com/developers/applications/)
and create a new application and customize it to your likings.

You should see something like this.

![You should see something like this.](https://media.discordapp.net/attachments/508571077958434839/511258005937979392/2018-11-11_21.14.15.png)

Navigate to the bot settings

And copy the token.

After you copied the token proceed to the next step.

![](https://cdn.discordapp.com/attachments/508571077958434839/511259113712517130/2018-11-11_21.21.00.png)

7. Open the Darkcore folder and navigate to `botconfig.json`. Open it using a text editor like notepad for windows or textedit for mac.

It should look like this
```json
{
    "token": "TOKEN GOES HERE",
    "prefix": "PREFIX GOES HERE",
    "admin": "ADMIN ID GOES HERE",
    "botname": "BOTNAME GOES HERE",
    "bugreportchannel": "CHANNEL ID GOES HERE"
  }
```
8. Paste your token into the token field. Dont remove the "".

9. Choose the name of the bot, and his prefix.

10. Go in discord, right-click on your pseudo, and select `Copy ID`. Replace `"ADMIN ID GOES HERE"` with it.

11. Choose the channel you want for the bug reports, and copy its ID by right-clicking on it. Paste it in front of the `"bugreportchannel"`

12. Open your console (You should already be in your Darkcore folder. If not, follow again step 4).

Type `node index.js` into the console.

The bot should now be activated and online.

11. To invite the bot in your server, return to your [application](https://discordapp.com/developers/applications/) and copy the Client Id in the main page.

Then copy this link and replace the `[Client Id]` with your ID

https://discordapp.com/oauth2/authorize?client_id=[Client_ID]&scope=bot&permissions=8

## Usage

To use this bot, there is two principal ways : 

You can either talk to him or use predefined commands.

To talk to him, simply start your sentence with his name, which is at the origin Darkcore. He works a bit like Siri or Google, and will recognize some words. For exemple, you can type things such as : 
```
Darkcore, tell me a good joke.
Darkcore, how old are you?
Darkcore, show me a geek meme.
Darkcore, explain me how you work
```

Sometimes, you might see bold words : They are keywords he can recognize.


Also, you can enter commands that he will recognize. To get a list of all the commands, do `/help`. His original prefix is '/', but you can change it with the command `/setnewprefix -new prefix-`. Here are some exemples of commands he knows : 
```
/serverinfo
/yomama
/report
/hangman
```

## Authors and Acknowledgments

I would like to show a special appreciation to my team of 3, with Nightcore, Darknew and Creepermystery

Also, I would like to give a special thanks to Discord for organizing this event, which permitted the birth of Darkcore
