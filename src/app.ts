import { Server as httpServer } from "http";
import express, { Express, NextFunction, Request, Response } from "express";
import { Cloner } from "./modules/cloner/cloner";
import { IConfig } from "./config/config.json";
import { Logger } from "./modules/logger/logger";
import config from "./modules/config/config";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import { Logger as winstonLogger } from "winston";
import cors from "cors";

/**
 * The App class
 */
export class App {
  private cloner: Cloner;
  private config: IConfig;
  private express: Express;
  private logger: winstonLogger;
  private server: httpServer;

  /**
   * Initialize the server
   */
  constructor() {
    this.express = express();
    this.config = config;
    this.logger = new Logger(this.config).defaultLogger();
    this.cloner = new Cloner(this.config, this.logger);
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
    this.express.use(cors({ exposedHeaders: this.config.corsHeaders }));

    this.express.use(
      createProxyMiddleware({
        logProvider: (provider) => this.logger,
        target: this.config.serverOptions.target,
        changeOrigin: true,
        secure: false,
        selfHandleResponse: true,
        onProxyRes: responseInterceptor(async (buffer, proxyRes, req, res) => {
          try {
            res.setHeader("content-type", "application/json; charset=utf-8");
            return await this.cloner.clone(
              res.statusCode,
              req.method,
              req.url,
              req.headers,
              buffer
            );
          } catch {
            return JSON.stringify({});
          }
        }),
      })
    );

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
    this.server = this.express.listen(this.config.app.port, () => {
      this.logger.info(`Listening on port ${this.config.app.port}`);
    });
  }

  /**
   * Stop the server
   */
  public stop() {
    this.server.close(() => {
      this.logger.info("The server has stopped.");
    });
  }
}
