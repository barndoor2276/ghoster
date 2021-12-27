import { Server as httpServer } from 'http';
import express, { Express, NextFunction, Request, Response } from 'express';
import { Cloner } from './modules/cloner/cloner';
import { IConfig } from './modules/config/config';
import { LoggingModule, ILogger } from './modules/logger/logger';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';

/**
 * The App class
 */
export class App {
  private cloner: Cloner;
  private express: Express;
  private logger: ILogger;
  private server: httpServer;

  /**
   * Initialize the server
   */
  constructor(private config: IConfig) {
    this.express = express();
    this.logger = new LoggingModule(this.config).defaultLogger();
    this.cloner = new Cloner(
      {
        cloneDir: this.config.appConfig.cloner,
        target: this.config.appConfig.serverOptions.target.toString(),
        targetName: this.config.appConfig.targetName
      },
      this.logger
    );
    this.MountRoutes();
  }

  /**
   * Initialize the server parameters
   */
  private MountRoutes() {
    /**
     * Middleware
     */
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(
      cors({ exposedHeaders: this.config.appConfig.corsHeaders })
    );

    this.express.use(this.cloner.middleware.bind(this.cloner));

    /**
     * ErrorHandler Middleware ** Must be last!
     */
    this.express.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        this.logger.error(err);
        res.status(500).send({ message: err.message });
      }
    );
  }

  /**
   * Start the server
   */
  public start() {
    this.server = this.express.listen(this.config.appConfig.app.port, () => {
      this.logger.info(`Listening on port ${this.config.appConfig.app.port}`);
    });
  }

  /**
   * Stop the server
   */
  public stop() {
    this.server.close(() => {
      this.logger.info('The server has stopped.');
    });
  }
}
