import { isStudentExists } from '@services/student.service';
import { addStudentToGroup, isGroupExists, removeStudentFromGroup } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, sid } = req.params

        const groupExists = await isGroupExists(+id)

        if (!groupExists) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        const studentExists = await isStudentExists(+sid)

        if (!studentExists) {
            return res.status(403).json({
                message: "Student not found: " + id
            })
        }

        await removeStudentFromGroup(+id, +sid)

        res.json({
            message: "Student added to group",
        })
    }
    catch(err) {
        next(err)
    }
}