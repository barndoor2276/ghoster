import { UrlController } from '../controllers';
import { Router } from './classes';

export default class UrlRouter extends Router {
    controller: UrlController;

    /**
     * Initialize the UrlRouter
     */
    constructor(controller: UrlController) {
        super(controller);
    }

    /**
     * Attach controller functions to router endpoints
     */
    AttachRoutes() {
        this.router.all('/*', this.controller.passthrough);
    }
}