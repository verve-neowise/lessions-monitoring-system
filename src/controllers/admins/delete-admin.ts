import { deleteUser } from '@services/user.service';
import { deleteStudent, isStudentExists } from '@services/student.service';
import { Request, Response, NextFunction } from 'express';
import { deleteAdmin, isAdminExists } from '@services/admin.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isAdminExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Admin not found: " + id
            })
        }

        const admin = await deleteAdmin(id)
        const user = await deleteUser(admin.userId)

        res.json({
            message: "Admin deleted.",
            admin
        })
    }
    catch(err) {
        next(err)
    }
}