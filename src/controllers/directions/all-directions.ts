import { allDirections } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const organizationId = +req.params.orgId 

        const directions = await allDirections(organizationId)

        res.json({
            message: "All directions",
            directions: directions.map(direction => ({
                id: direction.id,
                name: direction.name,
                status: direction.status
            }))
        })
    }
    catch(err) {
        next(err)
    }
}