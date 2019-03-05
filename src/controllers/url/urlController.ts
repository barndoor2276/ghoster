import { NextFunction, Request, Response } from 'express';
import { IncomingMessage } from 'http';
import { Controller } from '../classes';
import { ITargetApp } from '../../models/config/ITargetApp';
import { Logger } from 'winston';
// import { default as config } from '../../util/config';
/**
 * Url Controller
 * 
 * Receives HTTP requests, re-packages, and then forwards them along.
 */
export class UrlController extends Controller {

	constructor() {
		super();
		this.passthrough = this.passthrough.bind(this);
	}

	public passthrough(req: Request, res: Response, next: NextFunction) {
		this.connection.makeRequest(req, res, this.config.targetapp)
		.then((response: IncomingMessage) => {
			var data: any[] = [];
			response.on('data', (chunk: any): void => {
				data.push(chunk);
				// res.write(chunk);
			});
			response.on('end', (): void => {
				this.logger.info(`${response.statusCode} - ${response.statusMessage} - ${data.join("")}`);
				try {
					res.status(response.statusCode).send(JSON.parse(data.join("")));
				} catch (error) {
					this.logger.warn(`Could not parse JSON. Sending raw data.`);
					res.status(response.statusCode).send(data.join(""));
				}
			});
		})
		.catch((error: Error) => {
			this.logger.error(error.message);
			res.status(500).send({
				message: "failure",
				error: error.message
			});
		});
	}
}