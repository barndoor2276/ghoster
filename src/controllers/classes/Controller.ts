import { IConfig } from '../../models/config/IConfig';
import { Logger as winstonLogger } from 'winston'
import { Logger } from '../../util/logger';
import { IController } from './IController';
import { IConnectionManager } from '../../connection/IConnectionManager';
import { ConnectionManager } from '../../connection/ConnectionManager';
import { default as Config } from '../../util/config';

/**
 * Controller base class for custom controller
 */
export abstract class Controller implements IController {

	config: IConfig;
	connection: IConnectionManager;
	logger: winstonLogger;

	constructor() {
		this.config = Config;
		this.logger = new Logger().defaultLogger();
		this.connection = new ConnectionManager();
	}
}