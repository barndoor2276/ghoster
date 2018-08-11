import { Router, Request, Response, NextFunction } from 'express';
import * as defaultController from '../controllers/defaultController';

export class DefaultRouter {
    router: Router
  
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

const defaultRoutes = new DefaultRouter();

export default defaultRoutes.router;