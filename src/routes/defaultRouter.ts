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
     * GET something.
     */
    public getSomething(req: Request, res: Response, next: NextFunction) {
        defaultController.getSomething(req, res);
    };
  
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
      this.router.get('/', this.getSomething);
    };
}

const defaultRoutes = new DefaultRouter();
defaultRoutes.init();

export default defaultRoutes.router;