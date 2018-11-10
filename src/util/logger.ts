import winston, { createLogger } from "winston";
import * as path from 'path';
import { mkdirSync, existsSync } from 'fs';

import config from '../config/config.json'

// Create filelog directory from configuration
var myTransports = [];

for (let i of config.winston.transports) {
    if (i.type === 'file') {
        myTransports.push(new winston.transports.File(i.options));        
        try { 
            if(!existsSync(path.dirname(i.options.filename))) {
                mkdirSync(path.dirname(i.options.filename));
            }
        }
        catch (ex) {
            console.error('Error creating Winston file log directory.');
            console.error(ex.message);
        }
    }
    else if (i.type === 'console') {
        myTransports.push(new winston.transports.Console(i.options));  
    }
}

// Create the winston log transports
const logger = createLogger({
    transports: myTransports,
    format: winston.format.combine(
        winston.format.simple()
    )
});

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;