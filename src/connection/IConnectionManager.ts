import { IConfig } from "../config/IConfig";
import { Logger as winstonLogger } from "winston";
import { Request, Response } from 'express';

export interface IConnectionManager {
    config: IConfig;
    logger: winstonLogger;
    httpRequest(incoming: Request, outgoing: Response): Promise<any>;
    httpsRequest(incoming: Request, outgoing: Response): Promise<any>;
}