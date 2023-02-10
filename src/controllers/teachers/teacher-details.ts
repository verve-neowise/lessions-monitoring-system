import { findTeacherWithDetailsById } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const teacherId = +req.params.id

        const teacher = await findTeacherWithDetailsById(organizationId, teacherId)

        if (!teacher) {
            return res.status(404).json({
                message: 'Teacher not found',
            })
        }

        res.json({
            message: 'Teacher details',
            details: teacher
        })
    }
    catch(err) {
        next(err)
    }
}