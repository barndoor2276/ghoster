import { Request, Response } from 'express';
import { Controller } from './classes';

/**
 * Url Controller
 * 
 * Receives HTTP requests, re-packages, and then forwards them along.
 */
export default class UrlController extends Controller {
    /**
     * GET something
     * Something data
     */
    public getSomething(req: Request, res: Response) {
        var responseJSON = {
            "body": req.body,
            "headers": req.headers,
            "base-url": req.baseUrl
        };
        return res.status(200).send(responseJSON);
    }
    /**
     * POST something
     * Something data
     */
    public postSomething(req: Request, res: Response) {
        var responseJSON = {
            "body": req.body,
            "headers": req.headers,
            "base-url": req.baseUrl
        };
        return res.status(200).send(responseJSON);
    }
    /**
     * PUT something
     * Something data
     */
    public putSomething(req: Request, res: Response) {
        var responseJSON = {
            "body": req.body,
            "headers": req.headers,
            "base-url": req.baseUrl
        };
        return res.status(200).send(responseJSON);
    }
}