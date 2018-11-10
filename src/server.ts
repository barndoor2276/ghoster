import express, { Request, Response, Express, NextFunction } from 'express';
import { Server as HttpServer } from 'http';
import * as routers from './routes';
import * as controllers from './controllers'
import { Logger } from './util/logger';
import { Logger as winstonLogger } from 'winston';
import { IConfig } from './config/IConfig';

/**
 * The server class
 */
class Server {
    private bodyParser: any;
    private config: IConfig;
    private cors: any;
    private express: Express;
    private logger: winstonLogger;
    private server: HttpServer;
  
    /**
     * Initialize the server
     */
    constructor(app: Express) {
        this.bodyParser = require('body-parser');
        this.config = require('./config/config.json').default;
        this.cors = require('cors');
        this.express = app;
        this.logger = new Logger().defaultLogger();
        this.MountRoutes();
    }
  
    /**
     * Initialize the server parameters
     */
    private MountRoutes() {
        this.express.use(this.bodyParser.json());
        this.express.use(this.bodyParser.urlencoded({ extended: true }));
        this.express.use(this.cors({ exposedHeaders: this.config.corsHeaders }));
        this.express.use((req, res, next) => {
            this.logger.info(`Incoming: [${req.method} ${req.protocol}://${req.ip}${req.path}]`);
            next();
        });
        
        /**
         * App Routes - Url
         */
        this.express.use('/url', new routers.urlRouter(new controllers.UrlController()).getRouter());
        
        /**
         * App Routes - Default
         * Should be last in the list
         */
        this.express.use('/', new routers.defaultRouter(new controllers.DefaultController()).getRouter());

        this.express.use(function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
            res.status(500).send({ message: err.message });
        });
    }

    /**
     * Start the server
     */
    public Start(port: number, hostname: string) {
        process.on('uncaughtException', (err) => {
            this.logger.error('global exception: ' + err.message);
        })
        this.server = this.express.listen(port, hostname, (error: Error) => {
            if (error) {
                this.logger.error(error);
            }
            this.logger.info('App listening at ' + hostname + ':' + port);
        });
    }

    /**
     * Stop the server
     */
    public Stop() {
        this.server.close(() => {
            this.logger.info('App closed');
        });
    }
}

export default new Server(express());