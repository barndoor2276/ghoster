import { IConfig } from "../config/IConfig";
import { Logger as winstonLogger } from "winston";
import { Request, Response } from 'express';
import { RequestOptions } from "http";

export interface IConnectionManager {
    config: IConfig;
    logger: winstonLogger;
    makeRequest(incoming: Request, outgoing: Response): Promise<any>;
}