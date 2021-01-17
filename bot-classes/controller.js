const help = require('./help-content.js');
const FileManager = require('./FileManager');
const FileEditor = require('./FileEditor');
class Controller{
    constructor(view,service){
        this.view = view;
        this.service = service;
        this.view.login();
        this.file = './data.txt';
        this.fileManager = new FileManager(this.file);
        this.fileEditor = new FileEditor(this.fileManager);

        this.view.bindReadyBot(this.handlerReadyBot);
        this.view.bindMessageReceived(this.handlerMessageReceived);
        this.view.bindEmojiCreation(this.handlerEmojiCreation);
        // this.view.bindTypingEvent(this.handlerTypingMessage);
        this.view.bindDisconnetionOfBot(this.handlerDisconnection);
    }

    //* METHODS
    
    sendMsg = content => this.message.channel.send(content);

    add = splitted => {
        (splitted[1].includes(',')) ? this.service.addGroupOfItems(splitted[1]) : this.service.addNewItem(splitted[1]);
        this.sendMsg('Tu lista: '+this.service.toString());
    }
    random = _ => {
        const random = this.service.getRandomFromArray();
        this.sendMsg('El elemento obtenido es: '+random);
    }
    remove = splitted => {
        const position = parseInt(splitted[1],10);
        this.service.removeItemByPosition(position);
        this.sendMsg(this.service.toString());
    }
    show = _ => (this.service.arrayLength() === 0) ? this.sendMsg('Error: La lista esta vacia:') : this.sendMsg(this.service.toString());
    
    reset = _ => {
        this.service.resetList();
        this.sendMsg('Se ha borrado la lista');
    }
    save = split => {
            if(split[1]){
                this.fileEditor.addNewItem(split[1],this.service.toString())
                    .then(confirmation => this.sendMsg(confirmation))
                    .catch(err => this.sendMsg(err.message));
                }
                else {
                    this.sendMsg('No se ha introducido un nombre para guardar la lista');
                }
            }
    load = split => {
            if(split[1]){
                this.fileEditor.findListByName(split[1])
                .then(value => {
                    this.service.resetList();
                    this.service.addGroupOfItems(value);
                    this.sendMsg('Se ha cargado la lista indicada');
                })
                .catch(err => this.sendMsg(err.message));
            } else {
                this.sendMsg('No se ha introducido un nombre de lista para ser cargada');
            }
    }
    showfile = _ => this.fileManager.read().then(content => this.sendMsg(content)).catch(err => this.sendMsg(err.message));
    lenght = _ => this.sendMsg(this.service.arrayLength());
    resetfile = _ => this.fileManager.override('').then(_ => this.sendMsg('Se ha reseteado el archivo'))
        .catch(err => this.sendMsg(err.message));

    update = split => {
        if(split[1]){
            this.fileEditor.updateListByName(split[1],this.service.toString()).then(res => this.sendMsg(res))
             .catch(err => this.sendMsg(err.message));
        } else {
            this.sendMsg('No se ha introducido un nombre para modificar');
        }
    }
    delete = split => {
        if (split[1]){
            this.fileEditor.deleteListByName(split[1]).then(res => this.sendMsg(res))
             .catch(err => this.sendMsg(err.message));
        } else {
            this.sendMsg('No se ha introducido un nombre para borrar');
        }
    }
    changename = split => {
        if(split[1] && split[2]){
            this.fileEditor.changeListNameByOldName(split[1], split[2]).then(resp => this.sendMsg(resp))
            .catch(err => this.sendMsg(err.message));
        } else {
            this.sendMsg('No se ha introducido el comando de forma correcta');
        }
    }

    //* HANDLERS
    
    handlerReadyBot = channel => {
        channel.send('Bot cargado con nueva organizacion de ficheros');
    };

    handlerEmojiCreation = (channel,emoji) => {
        emoji.react(emoji).catch(error => channel.send(error));
    };

    handlerMessageReceived = (message,command) => {
        this.message = message;
        const splitSpace = _ => message.content.split(' ');

        const action = { 
            help: _ => this.sendMsg(help()),
            add: _ => this.add(splitSpace()),
            rand: _ => this.random(splitSpace()),
            show: _ => this.show(),
            reset: _ => this.reset(),
            length: _ => this.lenght(),
            remove: _ => this.remove(splitSpace()),
            save: _ => this.save(splitSpace()),
            load: _ => this.load(splitSpace()),
            update: _ => this.update(splitSpace()),
            delete: _ => this.delete(splitSpace()),
            changename: _ => this.changename(splitSpace()),
            resetfile: _ => this.resetfile(),
            showfile: _ => this.showfile(),
            default: _ => this.sendMsg('ERROR: Not Supported Command'),
        }
        try{
            if(message.content.startsWith(this.view.config.prefix)){
                const result = action[command] || action.default;
                result();
            }
        } catch(err){
            message.channel.send(err.message);
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