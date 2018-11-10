import { Request, Response } from 'express';
import { Controller } from './classes';

/**
 * Default Controller
 * 
 * Receives HTTP requests, re-packages, and then forwards them along.
 */
export default class DefaultController extends Controller {
    /**
     * GET something
     * Something data
     */
    public getSomething = (req: Request, res: Response) => {
        return res.status(200).send(
            {
                some: "thing"
            }
        );
    };
}