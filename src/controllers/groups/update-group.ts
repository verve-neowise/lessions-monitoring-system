import { Request, Response, NextFunction } from 'express';

import { GroupDto } from '@models/index';
import { isGroupExists, updateGroup } from '@services/group.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const id = +req.params.id

        const find = await isGroupExists(organizationId, id)
        
        if (!find) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        const dto: GroupDto = req.body

        const group = await updateGroup(id, dto)

        res.json({
            message: "Group updated.",
            group
        })
    }
    catch(err) {
        next(err)
    }
}