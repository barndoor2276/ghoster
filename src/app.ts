import { IncomingMessage, Server as httpServer } from "http";
import express, { Express, NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import { Cloner } from "./modules/cloner/cloner";
import { IConfig } from "./models/config/config";
import { Logger } from "./modules/logger/logger";
import config from "./modules/config/config";
import { createProxyMiddleware } from "http-proxy-middleware";
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
    process.on("uncaughtException", (err) => {
      this.logger.error("global exception: " + err.message);
    });

    this.config = config;
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
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(cors({ exposedHeaders: this.config.corsHeaders }));
    this.express.use((req, res, next) => {
      this.logger.info(
        `Incoming: [${req.method} ${req.protocol}://${req.ip}${req.path}]`,
        next
      );
    });

    this.express.use(
      "/",
      createProxyMiddleware({
        logProvider: (provider) => this.logger,
        target: this.config.serverOptions.target,
        changeOrigin: true,
        secure: false,
        onProxyRes: (proxyRes: IncomingMessage, req: Request, res: Response) =>
          this.cloner.clone(proxyRes, req, res),
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
