import { default as Config } from '../../modules/config/config';
import { ConnectionManager } from '../../modules/connection/ConnectionManager';
import { IConfig } from '../../models/config/IConfig';
import { IController } from './IController';
import { Logger } from '../../modules/logger/logger';
import { Logger as winstonLogger } from 'winston'

/**
 * Controller base class for custom controller
 */
export abstract class Controller implements IController {

	config: IConfig;
	connection: ConnectionManager;
	logger: winstonLogger;

	constructor() {
		this.config = Config;
		this.logger = new Logger().defaultLogger();
		this.connection = new ConnectionManager();
	}
}