const { Channel } = require("discord.js");

class Controller{
    constructor(view,service){
        this.view = view;
        this.service = service;
        this.view.login();

        this.view.bindReadyBot(this.handlerReadyBot);
        this.view.bindMessageReceived(this.handlerMessageReceived);
        this.view.bindEmojiCreation(this.handlerEmojiCreation);
        this.view.bindTypingEvent(this.handlerTypingMessage);
        this.view.bindDisconnetionOfBot(this.handlerDisconnection);
    }

    handlerReadyBot = channel => {
        channel.send('Bot cargado con nueva organizacion de ficheros');
    };

    handlerEmojiCreation = (channel,emoji) => {
        emoji.react(emoji).catch(error => channel.send(error));
    };

    handlerMessageReceived = (message,command) => {
        if(command === 'add'){
            const splitted = message.content.split(' ')[1];
            if(splitted.includes(',')){
                
            }
            this.service.addNewItem(splitted);
            message.channel.send(this.service.toString(this.service.array));
        }
    };

    handlerTypingMessage = (channel,user) => {        
        channel.send(`${user.username} está escribiendo en el chat: ${channel.name}`);
    };
    handlerDisconnection = channel => {
        channel.send('Bot desconectado de este servidor');
    };
}
module.exports = Controller;