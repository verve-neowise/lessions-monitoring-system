import { getTeacherGroups } from '@services/teacher-groups.service';
import { findTeacherByUserId } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const teacher = await findTeacherByUserId(organizationId, id)

        if (!teacher) {
            return res.status(404).json({
                message: `Teacher not found ${id}`
            })
        }

        console.log(id);
        console.log(teacher);

        const result = await getTeacherGroups(teacher.id)
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