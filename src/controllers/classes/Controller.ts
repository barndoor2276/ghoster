import { IConfig } from '../../config/IConfig';
import { Logger as winstonLogger } from 'winston'
import { Logger } from '../../util/logger';
import { IController } from './IController';
import { IConnectionManager } from '../../connection/IConnectionManager';
import { ConnectionManager } from '../../connection/ConnectionManager';

/**
 * Controller base class for custom controller
 */
export default abstract class Controller implements IController {

    config: IConfig;
    connection: IConnectionManager;
    logger: winstonLogger;

    constructor() {
        this.config = require('../../config/config.json').default;
        this.connection = new ConnectionManager();
        this.logger = new Logger().defaultLogger();
    }
}