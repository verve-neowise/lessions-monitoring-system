import { GroupResponse } from '@models/group.dto';
import { deleteGroup, isGroupExists, recoverGroup } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

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

        const group = await recoverGroup(id)
        
        const response: GroupResponse = {
            id: group.id,
            name: group.name,
            months: group.months,
            direction: null,
            teacher: null,
            status: group.status
        }

        res.json({
            message: "Group recovered.",
            group: response
        })
    }
    catch(err) {
        next(err)
    }
}