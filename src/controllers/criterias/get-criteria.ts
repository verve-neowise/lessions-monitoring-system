import { findCriteriaById } from '@services/criteria.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const criteria = await findCriteriaById(organizationId, id)

        if (!criteria) {
            return res.status(404).json({
                message: 'Criteia not found'
            })
        }

        res.status(200).json({
            message: 'Retrive criteria',
            criteria
        })
    }
    catch(err) {
        next(err)
    }
}