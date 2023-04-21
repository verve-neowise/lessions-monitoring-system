import { findStudentById } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const student = await findStudentById(organizationId, id)

        if (!student) {
            return res.status(404).json({
                message: 'Student not found'
            })
        }

        res.status(200).json({
            message: 'Retrive student',
            student
        })

    }
    catch(err) {
        next(err)
    }
}