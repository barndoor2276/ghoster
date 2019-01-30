import { Router as expressRouter } from 'express';
import { IRouter } from "./IRouter";
import { Controller } from '../../controllers/classes';


export abstract class Router implements IRouter {
	router: expressRouter;
	controller: Controller;

	constructor(controller: Controller) {
		this.router = expressRouter();
		this.controller = controller;
		this.AttachRoutes();
	}

	getRouter(): expressRouter {
		return this.router;
	}

	abstract AttachRoutes(): void;
}