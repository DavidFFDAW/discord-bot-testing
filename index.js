const discord = require('discord.js');
const client = new discord.Client();

const prefix = ':';
const commandList = 'Esta es la lista de comandos que admito: \n'+
' :hello - Te saludo con tu nombre \n'+
' :goodbye - Me despido con tu nombre';

client.once('ready', () => console.log('test-bot is online and ready'));

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        message.channel.send(commandList);
    } 
    else if(command === 'hello') {
        message.channel.send('Hola, bienvenido '+message.author.username);
    }
    else if(command === 'goodbye'){
        message.channel.send('Adioos maldito estupido '+message.author.username);
    }
    else {
        message.channel.send('No esta disponible este comando');
    }
});

client.on('messageDelete', message => {
    message.channel.send('Aqui no se borran los mensajes, '+message.author.username+' tu mensaje era: '+message.content);
});

// last
client.login('Nzg2OTIwNTkwNzI3OTcwODI2.X9Na6Q.u-sPEvuZ1GCprnzun1slnbZm6D4');