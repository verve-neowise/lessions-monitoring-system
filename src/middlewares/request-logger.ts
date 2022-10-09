import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    console.log(`>>> [${req.method}] ${req.originalUrl} -> `);
    console.log('\tPARAMS: ' + JSON.stringify(req.params));
    console.log('\tQUERY: ' + JSON.stringify(req.query));
    console.log('\tBODY: ' + JSON.stringify(req.body));
    next()
}