import { findDirectionById, findDirectionWithDetailsById } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const direction = await findDirectionWithDetailsById(organizationId, id)

        if (!direction) {
            return res.status(404).json({
                message: 'Direction not found'
            })
        }

        res.status(200).json({
            message: 'Retrive direction',
            direction
        })
    }
    catch(err) {
        next(err)
    }
}