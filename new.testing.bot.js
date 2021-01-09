const discord = require('discord.js');
const { prefix, token } = require('./bot_config.json');
const client = new discord.Client();

let server = 0;
let channel = 0;

client.once('ready',_ => { // makes the times as constructor
    server = client.guilds.cache.get('701142154474684507');
    channel = server.channels.cache.get('701142154474684510');
    console.log('Initiated !!');
    channel.send('Initiated '+client.user.tag+' with new instructions  :spaghetti:');
});
 
client.on('message',message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'react'){
        channel.send('Aqui voy...');
        message.channel.send('Mensaje de prueba caca');
        message.react(':clown:');        
    } 
});


client.login(token);