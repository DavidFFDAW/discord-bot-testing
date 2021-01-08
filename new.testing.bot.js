const discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new discord.Client();

const server = client.guilds.cache.get('701142154474684507');
const channel = server.channels.cache.get('701142154474684510');

client.once('ready',_ => {
    //console.log(server.memberCount);
    console.log('Initiated !!');
    channel.send('Initiated '+client.user.tag+' with new instructions  :spaghetti:');
});
/* 
client.on('message',message => {

}); */


client.login(token);