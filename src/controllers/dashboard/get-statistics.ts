import { Direction } from '@prisma/client';
import { allDirectionsWithGroup } from '@services/direction.service';
import { allGroupsCount } from '@services/group.service';
import { allStudentsCount } from '@services/student.service';
import { allTeachersCount } from '@services/teacher.service';

import { Request, Response, NextFunction } from 'express';

type CombinedDirection = Direction & {
    groups: {
        id: number;
        name: string;
        students: {
            id: number;
            name: string;
            surname: string;
        }[];
    }[];
    teachers: {
        id: number;
        name: string;
        surname: string;
    }[];
}

const mapDirection = (dir: CombinedDirection) => {
    const groupCount = dir.groups.length
    const studentCount = dir.groups.reduce((count, group) => count + group.students.length, 0)

    return {
        id: dir.id,
        name: dir.name,
        groups: groupCount,
        students: studentCount,
        teachers: dir.teachers
    }
}

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const organizationId = +req.params.orgId 

        const active = {
            teachers: await allTeachersCount(organizationId, 'active'),
            students: await allStudentsCount(organizationId, 'active'),
            groups: await allGroupsCount(organizationId, 'active'),
            directions: (await allDirectionsWithGroup(organizationId, 'active')).map(mapDirection)
        }

        const archive = {
            teachers: await allTeachersCount(organizationId, 'deleted'),
            students: await allStudentsCount(organizationId, 'deleted'),
            groups: await allGroupsCount(organizationId, 'deleted'),
            directions: (await allDirectionsWithGroup(organizationId, 'deleted')).map(mapDirection)
        }

        res.json({
            message: 'Statistics',
            active,
            archive
        })
    }
    catch(err) {
        next(err)
    }
}
