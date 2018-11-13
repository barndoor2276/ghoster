import express, { Request, Response, Express, NextFunction } from 'express';
import http from 'http';
import https from 'https';
import * as routers from './routes';
import * as controllers from './controllers'
import { Logger } from './util/logger';
import { Logger as winstonLogger } from 'winston';
import { IConfig } from './config/IConfig';
import { ITargetApp } from './config/ITargetApp';

/**
 * The server class
 */
export class Server {
    private bodyParser: any;
    private config: IConfig;
    private cors: any;
    private express: Express;
    private logger: winstonLogger;
    private target: ITargetApp;
  
    /**
     * Initialize the server
     */
    constructor(config: IConfig, target: ITargetApp) {
        this.bodyParser = require('body-parser');
        this.target = target;
        this.config = config;
        this.cors = require('cors');
        this.express = express();
        this.logger = new Logger().defaultLogger();
        this.MountRoutes();
    }
  
    /**
     * Initialize the server parameters
     */
    private MountRoutes() {
        /**
         * Middleware
         */
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
        this.express.use('/', new routers.urlRouter(new controllers.UrlController(this.target, this.logger)).getRouter());
        // this.express.use('/', new routers.defaultRouter(new controllers.DefaultController()).getRouter());

        /**
         * ErrorHandler Middleware ** Must be last!
         */
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
        });
        this.express.listen(port, hostname, (error: Error) => {
            if (error) {
                this.logger.error(error);
            }
            this.logger.info(`${this.target.name} listening at ` + hostname + ':' + port);
        });
    }
}