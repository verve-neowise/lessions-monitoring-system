import { isStudentExists } from '@services/student.service';
import { addStudentToGroup, isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const { id } = req.params

        const { studentId } = req.body

        const groupExists = await isGroupExists(organizationId, +id)

        if (!groupExists) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        const studentExists = await isStudentExists(organizationId, +studentId)

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