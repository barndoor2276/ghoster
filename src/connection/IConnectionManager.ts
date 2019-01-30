import { IConfig } from "../models/config/IConfig";
import { Logger as winstonLogger } from "winston";
import { Request, Response } from 'express';
import { RequestOptions } from "http";
import { ITargetApp } from "../models/config/ITargetApp";

export interface IConnectionManager {
	logger: winstonLogger;
	makeRequest(incoming: Request, outgoing: Response, target: ITargetApp): Promise<any>;
}