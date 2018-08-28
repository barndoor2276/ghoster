import { Request, Response } from 'express';

/**
 * Url Controller
 * 
 * Receives HTTP requests, re-packages, and then forwards them along.
 */
class UrlController {
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
    postSomething(req: Request, res: Response) {
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
    putSomething(req: Request, res: Response) {
        var responseJSON = {
            "body": req.body,
            "headers": req.headers,
            "base-url": req.baseUrl
        };
        return res.status(200).send(responseJSON);
    }
}

export default new UrlController();