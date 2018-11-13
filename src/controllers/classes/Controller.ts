import { IConfig } from '../../config/IConfig';
import { Logger as winstonLogger } from 'winston'
import { Logger } from '../../util/logger';
import { IController } from './IController';
import { IConnectionManager } from '../../connection/IConnectionManager';
import { ConnectionManager } from '../../connection/ConnectionManager';
import { ITargetApp } from '../../config/ITargetApp';

/**
 * Controller base class for custom controller
 */
export default abstract class Controller implements IController {

    config: IConfig;
    target: ITargetApp;
    connection: IConnectionManager;
    logger: winstonLogger;

    constructor(target: ITargetApp, logger: winstonLogger) {
        this.config = require('../../config/config.json').default;
        this.target = target;
        this.logger = logger;
        this.connection = new ConnectionManager(this.logger);
    }
}