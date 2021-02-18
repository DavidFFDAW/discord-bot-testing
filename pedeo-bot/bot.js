const Discord = require('discord.js');
const { prefix, token, botName } = require('./bot-config.json');
const client = new Discord.Client();

let server;
const forbiddenWords = ['gilipollas','tonto','subnormal','cabron','cabrón','cabrona','hijoputa','joputa','hijo de puta'];

//const settingInitChannel = _ => channel = client.guilds.cache.get(serverID).channels.cache.get(channelID);
const gettingCommand = message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;   
    const args = message.content.slice(prefix.length).split(/ +/);
    return args.shift().toLowerCase();
}

client.once('ready',_ => { // makes the times as constructor
    server = client.guilds.cache.get('701142154474684507');
    console.log('Initiated '+botName+'!');
    /*console.log(`Id: ${member.id} - Nombre: ${member.user.username}`)))*/
    //channel.send('Initiated '+botName);
});

client.on('message', message => {
    const command = gettingCommand(message);
    const lowerMessage = message.content.toLowerCase();

    if(forbiddenWords.some(element => lowerMessage.includes(element))){
        message.delete();
        message.channel.send('Este canal no es un canal para que se digan insultos o similares...');
    };

    if(command === 'hello'){
        message.channel.send('Hola mundo')
    }

    if(command === 'test'){
        server.members.fetch().then(members => members.forEach(member => message.channel.send(member.user.username))).catch(err => message.channel.send(err.message));
    }
})

client.login(token);