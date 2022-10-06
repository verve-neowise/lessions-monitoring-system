import { allDirections } from '@services/directions.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const directions = await allDirections()

        res.json({
            message: "All directions",
            directions
        })
    }
    catch(err) {
        next(err)
    }
}