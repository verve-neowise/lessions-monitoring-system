import { AdminResponse } from '@models/admin.dto';
import { allAdmins } from '@services/admin.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const organizationId = +req.params.orgId 

        const admins = await allAdmins(organizationId)
        
        const mapped: AdminResponse[] = admins.map(admin => {
            return {
                id: admin.id,
                userId: admin.user.id,
                name: admin.name,
                username: admin.user.username,
                permissions: admin.user.permissions,
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