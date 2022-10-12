import { deleteUser } from '@services/user.service';
import { deleteStudent, isStudentExists } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isStudentExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Student not found: " + id
            })
        }

        const student = await deleteStudent(id)
        const user = await deleteUser(student.userId)

        res.json({
            message: "Student deleted.",
            student
        })
    }
    catch(err) {
        next(err)
    }
}