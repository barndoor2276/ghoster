import { Router } from 'express';
import UrlController from '../controllers/urlController';

class UrlRouter {
    router: Router;

    /**
     * Initialize the UrlRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    };

    /**
     * Attach controller functions to router endpoints
     */
    init() {
        this.router.get('/*', UrlController.getSomething);
        this.router.post('/*', UrlController.postSomething);
        this.router.put('/*', UrlController.putSomething);
    };
}

export default new UrlRouter().router;