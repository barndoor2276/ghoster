import { Logger as winstonLogger } from 'winston'
import { IController } from './IController';
import { IConfig } from '../../models/config/IConfig';
import { IConnectionManager } from '../../modules/connection/IConnectionManager';

/**
 * IController interface for custom controller
 */
export interface IController {
	config: IConfig;
	connection: IConnectionManager;
	logger: winstonLogger;
}