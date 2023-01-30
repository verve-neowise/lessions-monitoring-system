import { allDirectionsWithGroup } from '@services/direction.service';
import { allGroupsCount } from '@services/group.service';
import { allStudentsCount } from '@services/student.service';
import { allTeachersCount } from '@services/teacher.service';

import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacherCount = await allTeachersCount()
        const studentCount = await allStudentsCount()
        const groupCount = await allGroupsCount()

        const directions = await allDirectionsWithGroup()

        const response = directions.map(dir => {
            const groupCount = dir.groups.length
            const studentCount = dir.groups.reduce((count, group) => count + group.students.length, 0)

            return {
                id: dir.id,
                name: dir.name,
                groups: groupCount,
                students: studentCount,
                teachers: dir.teachers
            }
        })

        res.json({
            message: 'Statistics',
            groups: groupCount,
            teachers: teacherCount,
            students: studentCount,
            directions: response
        })
    }
    catch(err) {
        next(err)
    }
}
