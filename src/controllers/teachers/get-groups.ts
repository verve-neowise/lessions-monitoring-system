import { getTeacherGroups } from '@services/teacher-groups.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const result = await getTeacherGroups(id)
        const groups = result?.groups.map(group => {
            return {
                id: group.id,
                name: group.name,
                months: group.months,
                direction: group.direction.name,
                students: group.students.length
            }
        })

        res.json({
            message: `Teacher ${id} groups`,
            groups
        })
    }
    catch(err) {
        next(err)
    }
}