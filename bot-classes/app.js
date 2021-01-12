const View = require('./view.js');
const Controller = require('./controller.js');
const Service = require('./service.js');

const view = new View();
const serv = new Service();

new Controller(view,serv);