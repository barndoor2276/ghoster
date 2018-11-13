import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import http, { ClientRequest } from "http";
import https from "https";
import { Logger as winstonLogger } from "winston";
import { IConfig } from "../config/IConfig";
import { Logger } from '../util/logger';
import { IConnectionManager } from "./IConnectionManager";

export class ConnectionManager implements IConnectionManager {
    config: IConfig;
    logger: winstonLogger;

    constructor() {
        this.config = require("../config/config.json").default;
        this.logger = new Logger().defaultLogger();
    }

    makeRequest(incoming: Request, outgoing: Response): Promise<any> {
        return new Promise((resolve, reject) => {

            var request: ClientRequest;
            
            if(this.config.targetapp.useHttps) {
                var httpsOptions: https.RequestOptions = {
                    host: this.config.targetapp.host,
                    port: this.config.targetapp.port,
                    method: incoming.method,
                    path: incoming.originalUrl
                };
    
                if(this.config.targetapp.caFile) {
                    httpsOptions.ca = readFileSync(this.config.targetapp.caFile);
                }
                this.logger.info(`Outgoing: [${httpsOptions.method} https://${httpsOptions.host}${httpsOptions.path}]`);
                request = https.request(httpsOptions, resolve);
            }
            else {
                var httpOptions: http.RequestOptions = {
                    host: this.config.targetapp.host,
                    port: this.config.targetapp.port,
                    method: incoming.method,
                    path: incoming.originalUrl
                };
                this.logger.info(`Outgoing: [${httpOptions.method} http://${httpOptions.host}${httpOptions.path}]`);
                request = http.request(httpOptions, resolve);
            }            

            if(incoming.headers.authorization) {
                request.setHeader("Authorization", incoming.headers.authorization);
            }

            request.on('error', (err: Error) => {
                this.logger.error("error in request: " + err.message);
                reject(err);
            });

            if(Object.keys(incoming.body).length != 0) {
                request.setHeader("Content-Type", incoming.headers["content-type"]);
                request.setHeader("Content-Length", incoming.body.length || 0);
                request.write(JSON.stringify(incoming.body));
            }

            request.end();
        });
    }
}