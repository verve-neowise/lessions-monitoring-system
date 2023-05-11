import { GroupDto, GroupResponse } from '@models/group.dto';
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

        const response: GroupResponse =  {
            id: group.id,
            name: group.name,
            months: group.months,
            direction: {
                id: group.direction.id,
                name: group.direction.name,
                status: group.direction.status
            },
            teacher: null,
            status: group.status
        }

        res.json({
            message: "group created.",
            group: response
        })
    }
    catch(err) {
        next(err)
    }
}