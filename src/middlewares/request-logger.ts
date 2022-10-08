import { NextFunction, Request, Response } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    console.log(`>>> [${req.method}] ${req.originalUrl} -> `);
    console.log('\tHEADERS: ' + req.headers);
    console.log('\tBODY: ' + req.body);
    next()
}