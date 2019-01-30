import { UrlController } from '../../controllers/url';
import { Router } from '../classes';

export class UrlRouter extends Router {
	controller: UrlController;

    /**
     * Initialize the UrlRouter
     */
	constructor() {
		super(new UrlController());
	}

    /**
     * Attach controller functions to router endpoints
     */
	AttachRoutes() {
		this.router.all('/*', this.controller.passthrough);
	}
}