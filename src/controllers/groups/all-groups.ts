import { allGroups } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const groups = await allGroups(organizationId)
        
        res.json({
            message: "All groups",
            groups
        })
    }
    catch(err) {
        next(err)
    }
}