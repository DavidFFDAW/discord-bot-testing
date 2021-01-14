const discord = require('discord.js');

const pref = '+';
const lists = `${pref}add [item] → añade un nuevo item a una lista.
${pref}add [item,item,...] → añade un grupo de item a una lista.
${pref}show → muestra la lista actual si es posible.
${pref}rand → obtiene y muestra un valor aleatorio de la lista.
${pref}length → muestra el tamaño del array.
${pref}remove [position] → borra el elemento en la posicion indicada.
${pref}reset → borra el contenido de la lista, reiniciandola.`

const files = `${pref}load [name] → carga la lista guardada con un cierto nombre.
${pref}save [name] → guarda la lista actual con el nombre que se indica.
${pref}resetfile → resetea el contenido del archivo, vaciandolo.
${pref}showfile → muestra el contenido del archivo donde se almacenan las listas.`;

const futureDev = `${pref}delete [name] → borrar la lista almacenada con el nombre indicado
${pref}update [name] → edita la lista guardada con este nombre indicado`;

const helpContent = _ => {
    return new discord.MessageEmbed()
    .setColor('#22a1f0')
    .setTitle('MANIPULACION DE LISTAS')
    .setDescription('Lista de comandos soportados')
    .addField('LOCAL',lists)
    .addField('ARCHIVO',files)
    .addField('DEV {}',futureDev)
    .setAuthor('test-bot')
    .setTimestamp(new Date());
};

module.exports = helpContent;