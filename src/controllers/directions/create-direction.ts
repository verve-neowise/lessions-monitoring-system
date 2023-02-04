import { createDirection } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const organizationId = +req.params.orgId 

        const { name } = req.body

        const direction = await createDirection(organizationId, name)
        
        res.json({
            message: "direction created.",
            direction
        })
    }
    catch(err) {
        next(err)
    }
}