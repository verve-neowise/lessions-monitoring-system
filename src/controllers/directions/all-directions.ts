import { EntityStatus } from '@prisma/client';
import { allDirections } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const status: EntityStatus = req.query.status as EntityStatus ?? EntityStatus.active

        const organizationId = +req.params.orgId 

        const directions = await allDirections(organizationId, status)

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