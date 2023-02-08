import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(501).json({
            message: 'Admin details not implemented'
        })
    }
    catch(err) {
        next(err)
    }
}