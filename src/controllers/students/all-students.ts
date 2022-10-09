import { allStudents } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const students = await allStudents()
        
        res.json({
            message: "All students",
            students
        })
    }
    catch(err) {
        next(err)
    }
}