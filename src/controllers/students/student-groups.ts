import { getStudentGroups } from '@services/student-groups.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const result = await getStudentGroups(id)

        const groups = result?.groups.map(group => {
            return {
                id: group.id,
                name: group.name,
                months: group.months,
                direction: group.direction.name
            }
        })

        res.json({
            message: `Student ${id} groups`,
            groups
        })
    }
    catch(err) {
        next(err)
    }
}