import { updateAdmin } from './../../services/admin.service';
import { isAdminExists } from '@services/admin.service';
import { isStudentExists, updateStudent } from '@services/student.service';
import { AdminDto, StudentDto } from '@models/index';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isAdminExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Admin not found: " + id
            })
        }

        const { name, surname } = req.body

        const dto: AdminDto = {
            name,
            surname
        }

        const admin = await updateAdmin(id, dto)

        res.json({
            message: "Admin updated.",
            admin
        })
    }
    catch(err) {
        next(err)
    }
}