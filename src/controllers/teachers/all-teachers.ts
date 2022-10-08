import { allTeachers } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await allTeachers()
        
        res.json({
            message: "All directions",
            teachers
        })
    }
    catch(err) {
        next(err)
    }
}