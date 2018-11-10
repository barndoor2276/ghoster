import { UrlController } from '../controllers';
import { Router } from './classes';

class UrlRouter extends Router {
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
        this.router.get('/*', this.controller.getSomething);
        this.router.post('/*', this.controller.postSomething);
        this.router.put('/*', this.controller.putSomething);
    }
}

export default new UrlRouter().getRouter();