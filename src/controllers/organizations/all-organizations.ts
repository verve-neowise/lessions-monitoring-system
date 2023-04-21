import { OrganizationResponse } from '@models/organization.dto';
import { EntityStatus } from '@prisma/client';
import { allOrganizations } from '@services/organization.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const status: EntityStatus = req.query.status as EntityStatus ?? EntityStatus.active

        const organizations: OrganizationResponse[] = await allOrganizations(status)

        res.status(200).json({
            message: 'All organizations',
            organizations
        })
    }
    catch(err) {
        next(err)
    }
}