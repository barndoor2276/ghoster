import express, { Request, Response, Express, NextFunction } from 'express';
import * as routers from './routes';
import { Logger } from './modules/logger/logger';
import { Logger as winstonLogger } from 'winston';
import { IConfig } from './models/config/IConfig';
import { default as config } from './modules/config/config';
import { Server as httpServer } from 'http';

/**
 * The App class
 */
export class App {
	private bodyParser: any;
	private config: IConfig;
	private cors: any;
	private express: Express;
	private logger: winstonLogger;
	private server: httpServer;

    /**
     * Initialize the server
     */
	constructor() {
		this.bodyParser = require('body-parser');
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
		this.express.use('/', new routers.UrlRouter().getRouter());
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
	public Start() {
		process.on('uncaughtException', (err) => {
			this.logger.error('global exception: ' + err.message);
		});
		this.server = this.express.listen(this.config.app.port, this.config.app.host, (error: Error) => {
			if (error) {
				this.logger.error(error);
			}
			this.logger.info(`Listening at ` + this.config.app.host + ':' + this.config.app.port);
		});
	}

	/**
	 * Stop the server
	 */
	public Stop() {
		this.server.close(() => {
			this.logger.info("The server has stopped.");
		});
	}

	public GetServer() {
		return this.server;
	}
}