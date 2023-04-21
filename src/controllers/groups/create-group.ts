import { GroupDto } from '@models/group.dto';
import { createGroup, isGroupWithNameExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const dto: GroupDto = req.body

        const find = await isGroupWithNameExists(organizationId, dto.name)

        if (find) {
            return res.status(400).json({
                message: 'Group with name ' + find + ' already exists'
            })
        }

        const group = await createGroup(organizationId, dto)

        res.json({
            message: "group created.",
            group: {
                id: group.id,
                name: group.name,
                months: group.months,
                direction: group.direction
            }
        })
    }
    catch(err) {
        next(err)
    }
}