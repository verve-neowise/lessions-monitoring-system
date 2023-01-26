import { deleteUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';
import { deleteAdmin, isAdminExists } from '@services/admin.service';
import { AdminResponse } from '@models/index';

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

        const response: AdminResponse = {
            id: admin.id,
            userId: user.id,
            name: admin.name,
            username: user.username,
            permissions: user.permissions,
            role: user.role
        }

        res.json({
            message: "Admin deleted.",
            admin: response
        })
    }
    catch(err) {
        next(err)
    }
}