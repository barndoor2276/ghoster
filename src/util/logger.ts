import winston, { createLogger, Logger as winstonLogger } from "winston";
import * as path from 'path';
import { mkdirSync, existsSync } from 'fs';
import { IConfig } from "../config/IConfig.js";

export class Logger {

    // Create filelog directory from configuration
    private myTransports: any[] = [];
    private logger: winstonLogger;
    private config: IConfig;

    constructor() {
        this.config = require('../config/config.json').default;

        for (let i of this.config.winston.transports) {
            if (i.type === 'file') {
                this.myTransports.push(new winston.transports.File(i.options));        
                try { 
                    if(!existsSync(path.dirname(i.options["filename"]))) {
                        mkdirSync(path.dirname(i.options.filename));
                    }
                }
                catch (ex) {
                    console.error('Error creating Winston file log directory.');
                    console.error(ex.message);
                }
            }
            else if (i.type === 'console') {
                this.myTransports.push(new winston.transports.Console(i.options));  
            }
        }

        // Create the winston log transports
        this.logger = createLogger({
            transports: this.myTransports,
            format: winston.format.combine(
                winston.format.simple()
            )
        });
    }

    public defaultLogger(): winstonLogger {
        return this.logger;
    }
}