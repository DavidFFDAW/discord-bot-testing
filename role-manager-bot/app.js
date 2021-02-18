require('dotenv').config();

const disc = require('discord.js');
const cli  = new disc.Client();



cli.login(process.env.TOKEN);