import { recoverUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';
import { isAdminExists, recoverAdmin } from '@services/admin.service';
import { AdminResponse } from '@models/index';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const id = +req.params.id

        const find = await isAdminExists(organizationId, id)
        
        if (!find) {
            return res.status(403).json({
                message: "Admin not found: " + id
            })
        }

        const admin = await recoverAdmin(id)
        const user = await recoverUser(admin.userId)

        const response: AdminResponse = {
            id: admin.id,
            userId: user.id,
            name: admin.name,
            username: user.username,
            permissions: user.permissions,
        }

        res.json({
            message: "Admin recovered.",
            admin: response
        })
    }
    catch(err) {
        next(err)
    }
}