import { GroupResponse } from '@models/group.dto';
import { EntityStatus } from '@prisma/client';
import { allGroups } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const status: EntityStatus = req.query.status as EntityStatus ?? EntityStatus.active
        const organizationId = +req.params.orgId 

        const groups = await allGroups(organizationId, status)

        const response: GroupResponse[] = groups.map(group => (
            {
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
        ))

        res.json({
            message: "All groups",
            groups: response
        })
    }
    catch(err) {
        next(err)
    }
}