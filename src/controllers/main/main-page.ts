import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.sendFile('static/home.html', {
            root: './'
        })
    }
    catch(err) {
        next(err)
    }
}