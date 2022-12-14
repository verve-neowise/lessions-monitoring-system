import { AdminResponse } from '@models/admin.dto';
import { allAdmins } from '@services/admin.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await allAdmins()
        
        const mapped: AdminResponse[] = admins.map(admin => {
            return {
                id: admin.id,
                userId: admin.user.id,
                name: admin.name,
                username: admin.user.username,
                permissions: admin.user.permissions,
                role: admin.user.role
            }
        })

        res.json({
            message: "All admins",
            admins: mapped
        })
    }
    catch(err) {
        next(err)
    }
}