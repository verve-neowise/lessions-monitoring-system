import { OrganizationResponse } from '@models/organization.dto';
import { deleteOrganization } from '@services/organization.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const organization: OrganizationResponse = await deleteOrganization(id)

        res.json({
            message: "organization deleted.",
            organization
        })
    }
    catch(err) {
        next(err)
    }
}