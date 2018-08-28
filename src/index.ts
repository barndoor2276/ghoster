import server from './server';

const config = require('./config/config.json');
const port = process.env.PORT || config.app.port;

server.Start(port, config.app.ip);