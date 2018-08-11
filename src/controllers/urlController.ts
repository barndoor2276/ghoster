import { Request, Response } from 'express';

/**
 * GET something
 * Something data
 */
export let getSomething = (req: Request, res: Response) => {
    var responseJSON = {
        "body": req.body,
        "headers": req.headers,
        "base-url": req.baseUrl
    }
    res.status(200).send(responseJSON);
};