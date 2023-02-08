import { findGroupById } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const group = await findGroupById(organizationId, id)

        if (!group) {
            return res.status(404).json({
                message: 'Group not found'
            })
        }

        res.status(200).json({
            message: 'Retrive group',
            group
        })
    }
    catch(err) {
        next(err)
    }
}