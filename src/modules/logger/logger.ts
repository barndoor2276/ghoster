import { existsSync, mkdirSync } from "fs";
import winston, { createLogger } from "winston";
import { IConfig } from "../config/config";
import { dirname } from "path";
import { ILogger } from "../../models/logger";

export class LoggingModule {
  private myTransports: any[] = [];
  private logger: ILogger;

  constructor(private config: IConfig) {
    for (let i of this.config.appConfig.winston.transports) {
      if (i.type === 'file') {
        try {
          if (!existsSync(dirname(i.options['filename']))) {
            mkdirSync(dirname(i.options.filename));
          }
          this.myTransports.push(new winston.transports.File(i.options));
        } catch (ex) {
          console.error('Error creating Winston file log directory.');
          console.error(ex.message);
        }
      } else if (i.type === 'console') {
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
          format: 'YYYY-MM-DD_HH:mm:ss',
          alias: 'myTime',
        }),
        myFormat
      ),
    });
  }

  public defaultLogger(): ILogger {
    return this.logger;
  }
}
