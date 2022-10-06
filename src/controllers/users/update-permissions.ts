import { updatePermissions } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const id = +req.params.id
        const { permissions } = req.body

        const update = await updatePermissions(id, permissions)

        res.json({
            message: `user ${update.username} permissions updated.`,
            permissions
        })
     }
    catch(err) {
        next(err)
    }
}