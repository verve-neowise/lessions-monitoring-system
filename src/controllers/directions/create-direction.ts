import { createDirection } from '@services/directions.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { name } = req.body

        const direction = await createDirection(name)
        
        res.json({
            message: "direction created.",
            direction
        })
    }
    catch(err) {
        next(err)
    }
}