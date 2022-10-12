import { updateAdmin } from './../../services/admin.service';
import { isAdminExists } from '@services/admin.service';
import { AdminDto } from '@models/index';
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

        const { name } = req.body

        const dto: AdminDto = {
            name
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