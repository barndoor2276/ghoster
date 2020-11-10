import { Config } from "../config/config";
import { IConfig } from '../../models/config/IConfig';
import { IncomingMessage } from 'http';
import { Logger } from '../logger/logger';
import { Logger as WinstonLogger } from 'winston'
import { mkdir } from '../fs/fs-promises';

export class Cloner {
	private config: IConfig;
	private logger: WinstonLogger;
	constructor() {
		this.config = Config.getConfig();
		this.logger = new Logger().defaultLogger();

		mkdir(this.config.cloner, { recursive: true }).catch((err) => { });
	}

	clone(response: IncomingMessage, body: any) {
		this.logger.info(response);
	}
}