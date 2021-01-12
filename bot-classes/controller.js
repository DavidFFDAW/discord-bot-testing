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
                this.service.addGroupOfItems(splitted);
            } else {
                this.service.addNewItem(splitted);
            }
            message.channel.send('Tu lista: '+this.service.toString(this.service.array));
        }
        else if(command === 'rand'){
            const random = this.service.getRandomFromArray();
            message.channel.send('El elemento obtenido es: '+random);
        }
        else if(command === 'remove'){
            const position = parseInt(message.content.split(' ')[1],10);
            this.service.removeItemByPosition(position);
            message.channel.send(this.service.toString(this.service.array));
        }
        else if(command === 'show'){
            if(this.service.array.length === 0){
                message.channel.send('La lista esta vacia (No hay Contenido)')
            }
            else{
                const array = this.service.toString(this.service.array);
                message.channel.send(array);
            }
        }
        else if(command === 'reset'){
            this.service.resetList();
            message.channel.send('Se ha borrado la lista');
        }
        else if(command === 'save'){
            if(this.service.array.length === 0){
                message.channel.send('No se guardará un array vacío');
            }
        }
        else if(command === 'load'){
            message.channel.send('Se cargarán los datos...');
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