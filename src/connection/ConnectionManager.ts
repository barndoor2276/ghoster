import { Request, Response } from 'express';
import { readFileSync } from 'fs';
import http, { ClientRequest } from "http";
import https from "https";
import { Logger as winstonLogger } from "winston";
import { IConfig } from "../config/IConfig";
import { Logger } from '../util/logger';
import { IConnectionManager } from "./IConnectionManager";
import { ITargetApp } from '../config/ITargetApp';

export class ConnectionManager implements IConnectionManager {
    logger: winstonLogger;

    constructor(logger: winstonLogger) {
        this.logger = logger;
    }

    makeRequest(incoming: Request, outgoing: Response, target: ITargetApp): Promise<any> {
        return new Promise((resolve, reject) => {

            var request: ClientRequest;
            
            if(target.useHttps) {
                var httpsOptions: https.RequestOptions = {
                    host: target.host,
                    port: target.port,
                    method: incoming.method,
                    path: incoming.originalUrl
                };
    
                if(target.caFile) {
                    httpsOptions.ca = readFileSync(target.caFile);
                }
                this.logger.info(`Outgoing: [${httpsOptions.method} https://${httpsOptions.host}${httpsOptions.path}]`);
                request = https.request(httpsOptions, resolve);
            }
            else {
                var httpOptions: http.RequestOptions = {
                    host: target.host,
                    port: target.port,
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