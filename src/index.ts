import server from './server';
import config from './config/config.json';

const port = config.app.port;

server.Start(port, config.app.host);