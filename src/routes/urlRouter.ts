import { Router, Request, Response, NextFunction } from 'express';
import * as urlController from '../controllers/urlController';

export class UrlRouter {
    router: Router
  
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
      this.router.post('/*', urlController.getSomething);
    };
}

const urlRoutes = new UrlRouter();

export default urlRoutes.router;