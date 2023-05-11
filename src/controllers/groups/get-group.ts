import { GroupResponse } from '@models/group.dto';
import { findGroupById, findGroupByIdWithDetails } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const group = await findGroupByIdWithDetails(organizationId, id)

        if (!group) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }

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

        res.status(200).json({
            message: 'Retrive group',
            group: response
        })
    }
    catch(err) {
        next(err)
    }
}