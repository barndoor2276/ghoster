import { DefaultController } from '../controllers';
import { Router } from './classes';

class DefaultRouter extends Router {
      controller: DefaultController;
    
      /**
       * Initialize the DefaultRouter
       */
      constructor() {
        super(new DefaultController());
      };
    
      /**
       * Attach controller functions to router endpoints
       */
      AttachRoutes() {
        this.router.get('/', this.controller.getSomething);
      };
}

export default new DefaultRouter().router;