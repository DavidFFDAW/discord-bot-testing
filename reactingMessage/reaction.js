const discord = require('discord.js');
const { prefix, token, botName } = require('../bot-config.json');
const { serverID, channelID } = require('../environment.json');
const functions = require('./functions');
const client = new discord.Client();

let channel;
let params;

const array = ['✂️','🪨','🧻'];
const settingInitChannel = _ => channel = client.guilds.cache.get(serverID).channels.cache.get(channelID);


client.once('ready',_ => { // makes the times as constructor
    settingInitChannel();
    functions.setPresence(client);
    params = { client: client, channel: channel };
    console.log('Initiated '+botName+'!');
    channel.send('Initiated '+botName);
});
 
client.on('message',message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'select'){
        message.channel.send('Dispondrás de 10 segundos para elegir');
        try{
            message.react('✂️').then(message.react('🧻')).then(message.react('🪨'));
            const filter = (reaction, user) => {
                return array.includes(reaction.emoji.name) && user.id === message.author.id;
            };

            message.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
                    let chosen;

                    if (reaction.emoji.name === '✂️') {
                        chosen = '✂️';
                        message.reply(`has elegido tijeras: ${chosen}`);
                    } else if(reaction.emoji.name === '🧻') {
                        chosen = '🧻';
                        message.reply(`has elegido papel: ${chosen}`);
                    } else{
                        chosen = '🪨';
                        message.reply(`has elegido piedra: ${chosen}`);
                    }
                })
                .catch(collected => {
                    message.reply('No has escogido ninguna opción');
                });
        } catch (err){
            functions.handleErrors(err,params);
        }
    } 
});

/* client.on("error", (e) => channel.send(e));
client.on("warn", (e) => channel.send(e));
client.on("debug", (e) => channel.send(e)); */


client.login(token);