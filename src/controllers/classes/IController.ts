import { IConfig } from '../../models/config/IConfig';
import { IConnectionManager } from '../../modules/connection/IConnectionManager';
import { Logger as winstonLogger } from 'winston'

/**
 * IController interface for custom controller
 */
export interface IController {
	config: IConfig;
	connection: IConnectionManager;
	logger: winstonLogger;
}