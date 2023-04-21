import { findDirectionWithDetailsById } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';
import getDirection from './get-direction';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const id = +req.params.id

        const direction = await findDirectionWithDetailsById(organizationId, id)

        if (!direction) {
            return res.status(404).json({
                message: 'Direction not found'
            })
        }

        const details = {
            id: direction.id,
            name: direction.name,
            groups: direction.groups.map(group => ({
                id: group.id,
                name: group.name,
                months: group.months,
                teachers: group.teacher
            })),
            teachers: direction.teachers,
            students: direction.groups.reduce((all, group) => all + group._count.students, 0),
            status: direction.status
        }

        res.status(200).json({
            message: 'Direction details',
            direction: details
        })
    }
    catch(err) {
        next(err)
    }
}