import { Server } from './server';
import config from './config/config.json';

var servers: Server[] = [];
config.targetapps.forEach((app) => {
    servers.push(new Server(config, app));
});
var port = config.app.port;
servers.forEach((server) => {
    server.Start(port, config.app.host);
    port++;
});