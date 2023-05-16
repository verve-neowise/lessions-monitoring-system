import { Request, Response, NextFunction } from 'express';

import { GroupDto, GroupResponse, UpdateGroupDto } from '@models/index';
import { findGroupWithName, isGroupExists, isGroupWithNameExists, updateGroup } from '@services/group.service';

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

        const dto: UpdateGroupDto = req.body

        const findName = await findGroupWithName(organizationId, dto.name)

        if (findName && findName.id != id) {
            return res.status(400).json({
                message: 'Group with name ' + find + ' already exists'
            })
        }

        const group = await updateGroup(id, dto)

        const response: GroupResponse = {
            id: group.id,
            name: group.name,
            months: group.months,
            direction: {
                id: group.direction.id,
                name: group.direction.name,
                status: group.direction.status
            },
            teacher: group.teacher == null ? null : {
                id: group.teacher.id,
                name: group.teacher.name,
                surname: group.teacher.surname,
                status: group.teacher.status
            },
            status: group.status
        }

        res.json({
            message: "Group updated.",
            group: response
        })
    }
    catch(err) {
        next(err)
    }
}