import { Request, Response, NextFunction } from 'express';
import { Controller } from './classes';
import http from 'http';
import https from 'https';
import { IConfig } from '../config/IConfig';
import { Logger as winstonLogger, loggers } from 'winston'
import { Logger } from '../util/logger';
/**
 * Url Controller
 * 
 * Receives HTTP requests, re-packages, and then forwards them along.
 */
export default class UrlController extends Controller {

    constructor() {
        super();
        this.passthrough = this.passthrough.bind(this);
    }

    public passthrough(req: Request, res: Response, next: NextFunction) {
        if(req.protocol == "http") {
            this.connection.httpRequest(req, res)
            .then((data) => {
                res.status(200).send({
                    message: "success",
                    data: data
                });
            })
            .catch((error: Error) => {
                this.logger.error(error.message);
                res.status(500).send({
                    message: "failure",
                    error: error
                });
            })
        }
    }
}