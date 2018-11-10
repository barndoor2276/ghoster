import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { Server as HttpServer } from 'http';
import config from './config/config.json';
import * as routers from './routes';
import logger from './util/logger';

/**
 * The server class
 */
class Server {
    private express: express.Express;
    private server: HttpServer;
  
    /**
     * Initialize the server
     */
    constructor() {
      this.express = express();
      this.MountRoutes();
    }
  
    /**
     * Initialize the server parameters
     */
    private MountRoutes() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(cors({ exposedHeaders: config.corsHeaders }));
        
        /**
         * App Routes - Url
         */
        this.express.use('/url', routers.urlRouter);
        
        /**
         * App Routes - Default
         * Should be last in the list
         */
        this.express.use('/', routers.defaultRouter);
    }

    /**
     * Start the server
     */
    public Start(port: number, hostname: string) {
        this.server = this.express.listen(port, hostname, (error: Error) => {
            if (error) {
                logger.error(error);
            }
            logger.info('App listening at ' + hostname + ':' + port);
        });
    }

    /**
     * Stop the server
     */
    public Stop() {
        this.server.close(() => {
            logger.info('App closed');
        });
    }
}

export default new Server();