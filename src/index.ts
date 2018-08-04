import express from 'express';
import bodyParser from 'body-parser';
import logger from './util/logger';

var config = require('./config/config.json');

// Controllers
import * as defaultController from './controllers/default';
import * as urlController from './controllers/url';

// Create Express Server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * App Routes - Default
 */
app.get('/', defaultController.getSomething);
/**
 * App Routes - Default
 */
app.get('/url', urlController.getSomething);


app.listen(config.app.port, config.app.ip, function () {
    logger.info('App listening at ' + config.app.ip + ':' + config.app.port);
});

export default app;