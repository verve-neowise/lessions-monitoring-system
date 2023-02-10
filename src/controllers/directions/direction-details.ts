import { findDirectionWithDetailsById } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';
import getDirection from './get-direction';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const id = +req.params.id

        const direction = await findDirectionWithDetailsById(organizationId, id)

        if (!direction) {
            return res.status(404).json({
                message: 'Direction not found'
            })
        }

        res.status(200).json({
            message: 'Direction details',
            direction: direction
        })
    }
    catch(err) {
        next(err)
    }
}