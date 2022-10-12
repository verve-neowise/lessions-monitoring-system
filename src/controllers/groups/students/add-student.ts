import { isStudentExists } from '@services/student.service';
import { addStudentToGroup, isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params

        const { studentId } = req.body

        const groupExists = await isGroupExists(+id)

        if (!groupExists) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        const studentExists = await isStudentExists(+studentId)

        if (!studentExists) {
            return res.status(403).json({
                message: "Student not found: " + id
            })
        }

        await addStudentToGroup(+id, +studentId)

        res.json({
            message: "Student added to group",
        })
    }
    catch(err) {
        next(err)
    }
}