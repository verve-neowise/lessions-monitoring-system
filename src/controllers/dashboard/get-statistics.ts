import { allDirectionsCount } from '@services/direction.service';
import { allGroupsCount } from '@services/group.service';
import { allStudentsCount } from '@services/student.service';
import { allTeachersCount } from '@services/teacher.service';

import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacherCount = (await allTeachersCount())._count
        const studentCount = (await allStudentsCount())._count
        const groupCount = (await allGroupsCount())._count
        const directionCount = (await allDirectionsCount())._count

        const directions = 

    }
    catch(err) {
        next(err)
    }
}