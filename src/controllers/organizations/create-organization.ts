import { OrganizationDto, OrganizationResponse } from '@models/organization.dto';
import { createOrganization } from '@services/organization.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orgDto: OrganizationDto = req.body

        const organization: OrganizationResponse = await createOrganization(orgDto)

        res.json({
            message: "organization created.",
            organization
        })
    }
    catch(err) {
        next(err)
    }
}