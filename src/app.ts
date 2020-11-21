import { IncomingMessage, Server as httpServer } from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';

import { Cloner } from './modules/cloner/cloner';
import { IConfig } from './models/config/IConfig';
import { Logger } from './modules/logger/logger';
import { default as config } from './modules/config/config';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Logger as winstonLogger } from 'winston';

/**
 * The App class
 */
export class App {
	private bodyParser: any;
	private cloner: Cloner;
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
		this.cloner = new Cloner();
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
		this.express.use('/', createProxyMiddleware({
			logProvider: (provider) => this.logger,
			target: this.config.serverOptions.target,
			changeOrigin: true,
			secure: false,
			onProxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) => {
				this.logger.info(proxyRes.statusCode.toString());
				let data: any[] = [];
				proxyRes.on('data', chunk => data.push(chunk));
				proxyRes.on('end', () => this.cloner.clone(req, proxyRes.statusCode, data.join('')));
			}
		}));

		/**
		 * ErrorHandler Middleware ** Must be last!
		 */
		this.express.use((err: Error, req: Request, res: Response, next: NextFunction) => {
			this.logger.error(err);
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
		this.server = this.express.listen(this.config.app.port, (error: Error) => {
			if (error) {
				this.logger.error(error);
			} else {
				this.logger.info(`Listening on port ${this.config.app.port}`);
			}
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