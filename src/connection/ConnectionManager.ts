import { IConnectionManager } from "./IConnectionManager";
import http from "http";
import https from "https";
import { IConfig } from "../config/IConfig";
import { Logger as winstonLogger } from "winston"
import { Logger } from '../util/logger';
import { Request, Response } from 'express';

export class ConnectionManager implements IConnectionManager {
    config: IConfig;
    logger: winstonLogger;

    constructor() {
        this.config = require("../config/config.json").default;
        this.logger = new Logger().defaultLogger();
    }

    httpRequest(incoming: Request, outgoing: Response): Promise<any> {
        return new Promise((resolve, reject) => {
            var options = {
                hostname: this.config.targetapp.ip,
                host: this.config.targetapp.ip,
                port: this.config.targetapp.port,
                method: incoming.method,
                path: incoming.originalUrl,
                headers: incoming.headers
            };

            const request = http.request(options, (response) => {
                var body: any[] = [];
                response.on('data', (chunk) => {
                    body.push(chunk);
                });
                response.on('error', (error) => {
                    this.logger.error("got error" + error);
                    reject(error);
                });
                response.on('end', () => {
                    resolve(JSON.parse(body.join('')));
                });
            });
            
            request.on('error', (err) => {
                this.logger.error("error in request: " + err.message);
                reject(err);
            });

            if(Object.keys(incoming.body).length != 0) {
                request.write(JSON.stringify(incoming.body));
            }

            request.end();
        });
    }

    httpsRequest(): Promise<any> {
        throw new Error('not implemented');
    }
}