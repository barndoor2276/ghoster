import { DefaultController } from '../controllers';
import { Router } from './classes';

export default class DefaultRouter extends Router {
      controller: DefaultController;
    
      /**
       * Initialize the DefaultRouter
       */
      constructor(controller: DefaultController) {
        super(controller);
    }
    
      /**
       * Attach controller functions to router endpoints
       */
      AttachRoutes() {
        this.router.get('/', this.controller.getSomething);
      };
}