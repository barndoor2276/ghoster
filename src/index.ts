import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import logger from './util/logger';

var config = require('./config/config.json');

// Controllers
import DefaultRouter from './routes/defaultRouter';
import UrlRouter from './routes/urlRouter';

// Create Express Server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * App Routes - Default
 */
app.use('/url', UrlRouter);

/**
 * App Routes - Default
 */
app.use('/', DefaultRouter);


app.listen(config.app.port, config.app.ip, function () {
    logger.info('App listening at ' + config.app.ip + ':' + config.app.port);
});

export default app;