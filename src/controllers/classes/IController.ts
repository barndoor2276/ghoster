import { Logger as winstonLogger, loggers } from 'winston'
import { IController } from './IController';
import { IConfig } from '../../config/IConfig';
import { ITargetApp } from '../../config/ITargetApp';
import { IConnectionManager } from '../../connection/IConnectionManager';

/**
 * IController interface for custom controller
 */
export interface IController {
    config: IConfig;
    target: ITargetApp;
    connection: IConnectionManager;
    logger: winstonLogger;
}