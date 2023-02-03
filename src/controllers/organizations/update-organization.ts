import { OrganizationDto, OrganizationResponse } from '@models/organization.dto';
import { updateOrganization } from '@services/organization.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const orgDto: OrganizationDto = req.body

        const organization: OrganizationResponse = await updateOrganization(id, orgDto)

        res.json({
            message: "organization updated.",
            organization
        })
    }
    catch(err) {
        next(err)
    }
}