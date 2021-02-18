const database = require('promise-mysql');

const connection = database.createConnection({
    host: '146.59.159.40',
    user: 'davidff',
    password: 'root',
    database: 'bot',
});

async function getPrefix() {
    const statement = 'SELECT prefix FROM somebot';
    const conn = await connection;
    return conn.query(statement);
}
async function updatePrefix(newPrefix) {
    const statement = `UPDATE somebot SET prefix = '${newPrefix}'`;
    const conn = await connection;
    return conn.query(statement);
}

module.exports = {
    getPrefix,
    updatePrefix,
}