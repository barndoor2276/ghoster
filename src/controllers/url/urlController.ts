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
				});
				response.on('end', (): void => {
					res.status(response.statusCode)
						.send(response.statusMessage);
				})
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