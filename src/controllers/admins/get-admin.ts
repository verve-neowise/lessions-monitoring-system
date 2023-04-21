import { findAdminById } from '@services/admin.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const admin = await findAdminById(organizationId, id)

        if (!admin) {
            return res.status(404).json({
                message: 'Admin not found'
            })
        }

        res.status(200).json({
            message: 'Retrive admin',
            admin
        })
    }
    catch(err) {
        next(err)
    }
}