import { isStudentExists, updateStudent } from '@services/student.service';
import { StudentDto } from '@models/index';
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

        const { name, surname, birthday, phone } = req.body
        
        const studentDto: StudentDto = {
            name,
            surname,
            birthday,
            phone,
        }

        const student = await updateStudent(id, studentDto)

        res.json({
            message: "Student updated.",
            student
        })
    }
    catch(err) {
        next(err)
    }
}