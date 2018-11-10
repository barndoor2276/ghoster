import { Router as expressRouter } from 'express';

export interface IRouter {
    router: expressRouter;
    getRouter(): expressRouter;
    AttachRoutes(): void;
}