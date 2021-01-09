const handleErrors = (err,{client,channel}) => {
    channel.send({embed: {
        color: 10038562,
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL()
        },
        title: 'ERROR',
        description: `Ha ocurrido alguna clase de error durante la ejecución:\n
        ERROR: ${err.message}`
        }
    });
};
const setPresence = client => {
    client.user.setPresence( {
        activity: {
            name: 'todos tus mensajes, perra',
            type: "PLAYING"
        },
        status: "online"
     });
};

module.exports = {
    setPresence: setPresence,
    handleErrors: handleErrors
}