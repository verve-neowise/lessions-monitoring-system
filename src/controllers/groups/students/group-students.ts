import { getGroupStudents } from './../../../services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const { id } = req.params

        const group = await getGroupStudents(organizationId, +id)

        if (!group) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        res.json({
            message: `Group ${group.name} students`,
            students: group.students
        })
    }
    catch(err) {
        next(err)
    }
}