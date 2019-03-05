import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import http, { ClientRequest } from "http";
import https from "https";
import { Logger as winstonLogger } from "winston";
import { Logger } from '../logger/logger';
import { IConnectionManager } from "./IConnectionManager";
import { ITargetApp } from '../../models/config/ITargetApp';
import { join, posix } from 'path';

export class ConnectionManager implements IConnectionManager {
	logger: winstonLogger;

	constructor() {
		this.logger = new Logger().defaultLogger();
	}

	makeRequest(incoming: Request, outgoing: Response, target: ITargetApp): Promise<any> {
		return new Promise((resolve, reject) => {

			var request: ClientRequest;

			if (target.useHttps) {
				var httpsOptions: https.RequestOptions = {
					host: target.host,
					port: target.port,
					method: incoming.method,
					path: posix.join(target.basePath, incoming.originalUrl)
				};

				if (target.caFile) {
					httpsOptions.ca = readFileSync(target.caFile);
				}
				this.logger.info(`Outgoing: [${httpsOptions.method} https://${httpsOptions.host}:${httpsOptions.port}${httpsOptions.path}]`);
				request = https.request(httpsOptions, resolve);
			}
			else {
				var httpOptions: http.RequestOptions = {
					host: target.host,
					port: target.port,
					method: incoming.method,
					path: incoming.originalUrl
				};
				this.logger.info(`Outgoing: [${httpOptions.method} http://${httpOptions.host}:${httpOptions.port}${httpOptions.path}]`);
				request = http.request(httpOptions, resolve);
			}

			if (incoming.headers.authorization) {
				request.setHeader("Authorization", incoming.headers.authorization);
			}

			request.on('error', (err: Error) => {
				this.logger.error("error in request: " + err.message);
				reject(err);
			});

			// try {
			// 	var jsonBody = JSON.parse(incoming.body);

			// 	if (JSON.stringify(incoming.body).length > 0) {
			// 		if(incoming.headers["content-type"]) {
			// 			request.setHeader("content-type", incoming.headers["content-type"] || "application/json");
			// 		}
			// 		if(incoming.headers["content-length"]) {
			// 			request.setHeader("content-length", JSON.stringify(incoming.body).length || 0);
			// 		}
			// 		this.logger.info(JSON.stringify(incoming.body));
			// 		request.write(JSON.stringify(incoming.body));
			// 	}
			// } catch (error) {
			// 	this.logger.warn(`Could not parse incoming body to JSON. Writing raw data. ${error}`);
			// 	if (incoming.body) {
			// 		if(incoming.headers["content-type"]) {
			// 			request.setHeader("content-type", incoming.headers["content-type"] || "application/octet-stream");
			// 		}
			// 		if(incoming.headers["content-length"]) {
			// 			request.setHeader("content-length", incoming.body.length || 0);
			// 		}
			// 		this.logger.info(incoming.body);
			// 		request.write(incoming.body);
			// 	}
			// }

			if(incoming.body !== null && incoming.body !== undefined) {
				if(incoming.headers["content-type"]) {
					request.setHeader("content-type", incoming.headers["content-type"]);
				}
				if(incoming.body.constructor === {}.constructor) {
					request.setHeader("content-length", JSON.stringify(incoming.body).length || 0);
					this.logger.info(JSON.stringify(incoming.body));
					request.write(JSON.stringify(incoming.body));
				}
				else if(incoming.body.constructor === "".constructor) {
					request.setHeader("content-length", incoming.body.length || 0);
					this.logger.info(incoming.body);
					request.write(incoming.body);
				}
			}

			request.end();
		});
	}
}