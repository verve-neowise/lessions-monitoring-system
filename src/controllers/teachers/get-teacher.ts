import { findTeacherById } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const teacher = await findTeacherById(organizationId, id)

        if (!teacher) {
            return res.status(404).json({
                message: 'Teacher not found'
            })
        }

        res.status(200).json({
            message: 'Retrive teacher',
            teacher
        })
    }
    catch(err) {
        next(err)
    }
}