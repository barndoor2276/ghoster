import { NextFunction, Request, Response } from 'express';

import { Cloner } from '../../modules/cloner/cloner';
import { Controller } from '../classes';
import { IncomingMessage } from 'http';

/**
 * Url Controller
 * 
 * Receives HTTP requests, re-packages, and then forwards them along.
 */
export class UrlController extends Controller {

	cloner: Cloner;

	constructor() {
		super();
		this.passthrough = this.passthrough.bind(this);
		this.cloner = new Cloner();
	}

	public passthrough(req: Request, res: Response, next: NextFunction) {
		this.connection.makeRequest(req, res, this.config.targetapp)
			.then((response: IncomingMessage) => {
				var data: any[] = [];
				response.on('data', (chunk: any): void => {
					data.push(chunk);
				});
				response.on('end', (): void => {
					this.logger.info(`${response.statusCode} - ${response.statusMessage} - ${data.join("")}`);
					let responseData;

					try {
						responseData = JSON.parse(data.join(""));
						res.status(response.statusCode).send(responseData);
					} catch (error) {
						this.logger.warn(`Could not parse JSON. Sending raw data.`);
						this.logger.warn(data.join(""));
						responseData = data.join("");
						res.status(response.statusCode).send(responseData);
					} finally {
						this.cloner.clone(response, responseData);
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