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
     * GET something.
     */
    public getSomething(req: Request, res: Response, next: NextFunction) {
        urlController.getSomething(req, res);
    };
  
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
      this.router.get('/', this.getSomething);
    };
}

const urlRoutes = new UrlRouter();
urlRoutes.init();

export default urlRoutes.router;