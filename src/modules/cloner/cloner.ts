import { exists, mkdir, stat, writeFile } from '../fs/fs-promises';

import { Config } from "../config/config";
import { IConfig } from '../../models/config/IConfig';
import { Logger } from '../logger/logger';
import { Request } from 'express';
import { ServerResponses } from '../../models/server-responses';
import { Logger as WinstonLogger } from 'winston'
import path from 'path';

export class Cloner {
	private config: IConfig;
	private logger: WinstonLogger;
	constructor() {
		this.config = Config.getConfig();
		this.logger = new Logger().defaultLogger();

		mkdir(this.config.cloner, { recursive: true }).catch((err) => { });
	}

	public async clone(req: Request, statusCode: number, data: string) {

		const clonePath = path.join(this.config.cloner, req.path);
		const resPath = path.join(clonePath, `${req.method.toLowerCase()}.json`);
		await mkdir(clonePath, { recursive: true });

		if (await exists(resPath)) {
			let file: ServerResponses = require(resPath);
			file.responses.push({
				headers: req.headers,
				statusCode: statusCode,
				data: data
			});
			await writeFile(resPath, JSON.stringify(file, null, 4)).catch((err) => this.logger.error(err));
		} else {
			await writeFile(resPath, JSON.stringify({
				responses: [{
					headers: req.headers,
					statusCode: statusCode,
					data: data
				}]
			} as ServerResponses, null, 4)).catch((err) => this.logger.error(err));
		}
	}
}