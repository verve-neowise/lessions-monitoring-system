import { EntityStatus } from '@prisma/client';
import { allCriterias } from '@services/criteria.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status: EntityStatus = req.query.status as EntityStatus ?? EntityStatus.active

        const organizationId = +req.params.orgId

        const criterias = await allCriterias(organizationId, status)

        res.json({
            message: 'Retrive all criterias',
            criterias
        })
    }
    catch(err) {
        next(err)
    }
}