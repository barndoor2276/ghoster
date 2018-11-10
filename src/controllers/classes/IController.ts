import { Logger as winstonLogger, loggers } from 'winston'
import { IController } from './IController';
import { IConfig } from '../../config/IConfig';
import { IConnectionManager } from '../../connection/IConnectionManager';

/**
 * IController interface for custom controller
 */
export interface IController {
    config: IConfig;
    connection: IConnectionManager;
    logger: winstonLogger;
}