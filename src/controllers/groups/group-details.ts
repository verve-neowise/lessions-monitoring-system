import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(501).json({
            message: "Not implemented"
        })
    }
    catch(err) {
        next(err)
    }
}