import winston, { createLogger } from "winston";
import { Logger } from "winston";

var config = require('../config/config.json');

const logger = createLogger({
    transports: [
        new winston.transports.Console(config.winston.console)
    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.debug("Logging initialized at debug level");
}

export default logger;