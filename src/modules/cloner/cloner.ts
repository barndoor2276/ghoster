import { Request, Response } from 'express';
import { exists, mkdir, stat, writeFile } from '../fs/fs-promises';

import { Config } from "../config/config";
import { IConfig } from '../../models/config/IConfig';
import { IncomingMessage } from 'http';
import { Logger } from '../logger/logger';
import { Logger as WinstonLogger } from 'winston'
import deepmerge from 'deepmerge';
import path from 'path';

export class Cloner {
	private config: IConfig;
	private logger: WinstonLogger;
	constructor() {
		this.config = Config.getConfig();
		this.logger = new Logger().defaultLogger();

		mkdir(this.config.cloner, { recursive: true }).catch((err) => { });
	}

	public async clone(proxyRes: IncomingMessage, req: Request, res: Response) {

		const statusCode = proxyRes.statusCode;
		const data = await new Promise(resolve => {
			let chunks: any[] = [];
			proxyRes.on('data', chunk => chunks.push(chunk));
			proxyRes.on('end', () => resolve(chunks.join('')));
		});

		const resPath = path.join(this.config.cloner, `${this.config.targetName}.json`);

		let file: any;
		if (await exists(resPath)) {
			file = require(resPath);
		} else {
			file = {};
		}

		let responseObj: any = {
			responses: {
				[req.method.toLowerCase()]: {
					headers: req.headers,
					statusCode: statusCode,
					data: data
				}
			}
		};

		req.path.split('/').reverse().forEach((part, index, array) => {
			if (part) {
				responseObj = {
					[part]: responseObj
				}
			}
		});

		await writeFile(resPath, JSON.stringify(deepmerge(responseObj, file), null, 4)).catch((err) => this.logger.error(err));
	}
}