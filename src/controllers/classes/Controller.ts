import { IConfig } from '../../models/config/IConfig';
import { Logger as winstonLogger } from 'winston'
import { Logger } from '../../modules/logger/logger';
import { IController } from './IController';
import { ConnectionManager } from '../../modules/connection/';
import { default as Config } from '../../modules/config/config';

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