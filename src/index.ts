import express from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import logger from './util/logger';

var config = require('./config/config.json');

// Controllers
import DefaultRouter from './routes/defaultRouter';
import UrlRouter from './routes/urlRouter';

/**
 * The application class
 */
export class App {
    app: express.Express
  
    /**
     * Initialize the app
     */
    constructor() {
      this.app = express();
      this.init();
    };
  
    /**
     * Initialize the app parameters
     */
    init() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        
        /**
         * App Routes - Url
         */
        this.app.use('/url', UrlRouter);
        
        /**
         * App Routes - Default
         * Should be last in the list
         */
        this.app.use('/', DefaultRouter);
        
        
        this.app.listen(config.app.port, config.app.ip, function () {
            logger.info('App listening at ' + config.app.ip + ':' + config.app.port);
        });
    };
}

export default new App();