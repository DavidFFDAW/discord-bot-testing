const help = require('./help-content.js');
const FileEditor = require('./FileEditor');
class Controller{
    constructor(view,service){
        this.view = view;
        this.service = service;
        this.view.login();
        this.fileManager = require('./FileManager');
        this.fileEditor = new FileEditor(this.fileManager);

        this.view.bindReadyBot(this.handlerReadyBot);
        this.view.bindMessageReceived(this.handlerMessageReceived);
        this.view.bindEmojiCreation(this.handlerEmojiCreation);
        // this.view.bindTypingEvent(this.handlerTypingMessage);
        this.view.bindDisconnetionOfBot(this.handlerDisconnection);
    }

    handlerReadyBot = channel => {
        channel.send('Bot cargado con nueva organizacion de ficheros');
    };

    handlerEmojiCreation = (channel,emoji) => {
        emoji.react(emoji).catch(error => channel.send(error));
    };

    handlerMessageReceived = (message,command) => {
        if(command === 'help'){
            message.channel.send(help());
        }
        else if(command === 'add'){
            const splitted = message.content.split(' ')[1];
            if(splitted.includes(',')){
                this.service.addGroupOfItems(splitted);
            } else {
                this.service.addNewItem(splitted);
            }
            message.channel.send('Tu lista: '+this.service.toString());
        }
        else if(command === 'rand'){
            const random = this.service.getRandomFromArray();
            message.channel.send('El elemento obtenido es: '+random);
        }
        else if(command === 'remove'){
            const position = parseInt(message.content.split(' ')[1],10);
            this.service.removeItemByPosition(position);
            message.channel.send(this.service.toString());
        }
        else if(command === 'show'){
            if(this.service.array.length === 0){
                message.channel.send('La lista esta vacia (No hay Contenido)')
            }
            else{
                const array = this.service.toString();
                message.channel.send(array);
            }
        }
        else if(command === 'reset'){
            this.service.resetList();
            message.channel.send('Se ha borrado la lista');
        }
        else if(command === 'save'){
            const split = message.content.split(' ');
            if(split[1]){ // implica que se ha indicado un nombre
                try{
                    this.fileEditor.tryAddItemToFile(split[1],this.service.toString())
                    .then(confirmation => message.channel.send(confirmation))
                    .catch(err => message.channel.send(err.message));
                } catch(err){
                    message.channel.send(err.message);
                }
            } else {
                message.channel.send('No se ha introducido un nombre para guardar la lista');
            }
        }
        else if(command === 'load'){
            const split = message.content.split(' ');
            if(split[1]){
                this.fileEditor.tryFindingListByName(split[1])
                .then(value => {
                    this.service.resetList();
                    this.service.addGroupOfItems(value);
                    message.channel.send('Se ha cargado la lista indicada');
                })
                .catch(err => message.channel.send(err.message));
            } else {
                message.channel.send('No se ha introducido un nombre de lista para ser cargada');
            }
        }
        else if(command === 'length'){
            message.channel.send(this.service.arrayLength());
        }
        else if(command === 'showfile'){
            this.fileManager.read().then(content => message.channel.send(content))
            .catch(err => message.channel.send(err.message));
        }
        else if(command === 'resetfile'){
            this.fileManager.override('').then(_ => message.channel.send('Se ha reseteado el archivo'))
            .catch(err => message.channel.send(err.message));
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