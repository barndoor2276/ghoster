import { Router } from 'express';
import * as defaultController from '../controllers/defaultController';

class DefaultRouter {
    router: Router;
  
    /**
     * Initialize the DefaultRouter
     */
    constructor() {
      this.router = Router();
      this.init();
    };
  
    /**
     * Attach controller functions to router endpoints
     */
    init() {
      this.router.get('/', defaultController.getSomething);
    };
}

export default new DefaultRouter().router;