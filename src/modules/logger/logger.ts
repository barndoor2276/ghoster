import { existsSync, mkdirSync } from "fs";
import winston, { createLogger, Logger as winstonLogger } from "winston";

import { Config } from "../config/config";
import { IConfig } from "../../models/config/config.js";
import { dirname } from "path";

export class Logger {
  private myTransports: any[] = [];
  private logger: winstonLogger;

  constructor(private config: IConfig) {
    for (let i of this.config.winston.transports) {
      if (i.type === "file") {
        try {
          if (!existsSync(dirname(i.options["filename"]))) {
            mkdirSync(dirname(i.options.filename));
          }
          this.myTransports.push(new winston.transports.File(i.options));
        } catch (ex) {
          console.error("Error creating Winston file log directory.");
          console.error(ex.message);
        }
      } else if (i.type === "console") {
        this.myTransports.push(new winston.transports.Console(i.options));
      }
    }

    const myFormat = winston.format.printf((info) => {
      return `${info.level}: ${info.myTime}  [ ${info.message} ]`;
    });

    // Create the winston log transports
    this.logger = createLogger({
      transports: this.myTransports,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: "YYYY-MM-DD_HH:mm:ss",
          alias: "myTime",
        }),
        myFormat
      ),
    });
  }

  public defaultLogger(): winstonLogger {
    return this.logger;
  }
}
