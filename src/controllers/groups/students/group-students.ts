import { getGroupStudents } from './../../../services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const group = await getGroupStudents(+id)

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