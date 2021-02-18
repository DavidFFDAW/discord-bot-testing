class View{
    constructor(){
        this.discord = require('discord.js');
        this.config = require('./bot-config.json');
        this.env = require('./environment.json');
        this.client = new this.discord.Client();
    }

    gettingCommand = message => {
        if(!message.content.startsWith(this.config.prefix) || message.author.bot) return;   
        const args = message.content.slice(this.config.prefix.length).split(/ +/);
        return args.shift().toLowerCase();
    }

    bindReadyBot(handler){
        this.client.once('ready', _ => {
            this.channel = this.client.guilds.cache.get(this.env.serverID).channels.cache.get(this.env.channelID);
            console.log('Connected '+this.config.botName+' to the server');
            this.client.user.setActivity('Arrays');
            handler(this.channel);
        });
    };
    bindEmojiCreation(handler){
        this.client.on('emojiCreate', emoji => {
            handler(channel,emoji);
        });
    };
    bindMessageReceived(handler){
        this.client.on('message', (message) => {
            const command = this.gettingCommand(message);
            handler(message,command);
        });
    };
    bindTypingEvent(handler){
        this.client.on('typingStart', (channel,user) => {
            handler(channel,user);
        });
    };
    bindDisconnetionOfBot(handler){
        this.client.once('disconnect', _ => {
            console.log('Disconnected');
            handler(this.channel);
        });
    };
    login(){
        this.client.login(this.config.token);
    }
}
module.exports = View;