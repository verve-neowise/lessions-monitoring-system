import { GroupDto } from '@models/group.dto';
import { createGroup } from '@services/group.service';
import { createLessionsForCount } from '@services/lession.service';
import { Request, Response, NextFunction } from 'express';

import { Group } from '@prisma/client';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: GroupDto = req.body

        const group = await createGroup(dto)
        const lessions = await createLessionsForCount(group.id, dto.months)

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