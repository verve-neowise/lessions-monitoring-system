import { OrganizationResponse } from '@models/organization.dto';
import { deleteOrganization, recoverOrganization } from '@services/organization.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const organization: OrganizationResponse = await recoverOrganization(id)

        res.json({
            message: "organization recovered.",
            organization
        })
    }
    catch(err) {
        next(err)
    }
}