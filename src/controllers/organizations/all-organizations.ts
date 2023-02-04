import { OrganizationResponse } from '@models/organization.dto';
import { allOrganizations } from '@services/organization.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizations: OrganizationResponse[] = await allOrganizations()

        res.status(200).json({
            message: 'All organizations',
            organizations
        })
    }
    catch(err) {
        next(err)
    }
}