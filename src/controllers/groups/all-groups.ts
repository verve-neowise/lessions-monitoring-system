import { EntityStatus } from '@prisma/client';
import { allGroups } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status: EntityStatus = req.query.status as EntityStatus ?? EntityStatus.active
        const organizationId = +req.params.orgId 

        const groups = await allGroups(organizationId, status)
        
        res.json({
            message: "All groups",
            groups
        })
    }
    catch(err) {
        next(err)
    }
}