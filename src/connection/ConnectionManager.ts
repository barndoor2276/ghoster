import { Request, Response } from 'express';
import { readFile } from 'fs';
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
            
            var options: any = {
                port: this.config.targetapp.port,
                method: incoming.method,
                path: this.config.targetapp.basePath + incoming.originalUrl,
                headers: {
                    "connection": incoming.headers.connection
                }
            };

            if(this.config.targetapp.caFile) {
                readFile(this.config.targetapp.caFile, (err, data) => {
                    if (err) {
                        this.logger.error("Could not read caFile: " + err);
                        reject(err);
                    } else {
                        options.ca = data;
                    }
                });
            }

            if(!this.config.targetapp.hostname) {
                options.host = this.config.targetapp.host;
            } else {
                options.hostname = this.config.targetapp.hostname;
            }

            if(incoming.headers.authorization) {
                options.headers["Authorization"] = incoming.headers.authorization;
            }

            var request: ClientRequest;
            if(this.config.targetapp.useHttps) {
                request = http.request(options, resolve);
            } else {
                request = https.request(options, resolve);
            }

            request.on('error', (err) => {
                this.logger.error("error in request: " + err.message);
                reject(err);
            });

            if(Object.keys(incoming.body).length != 0) {
                request.setHeader("Content-Type", incoming.headers["content-type"]);
                request.setHeader("Content-Length", JSON.stringify(incoming.body).length);
                request.write(JSON.stringify(incoming.body));
            }

            request.end();
        });
    }
}