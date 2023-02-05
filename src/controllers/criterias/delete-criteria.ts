import { deleteCriteria, isCriteriaExists } from '@services/criteria.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const isExists = await isCriteriaExists(organizationId, id)

        if (!isExists) {
            return res.status(404).json({
                message: `Direction not found.`
            })            
        }

        const criteria = await deleteCriteria(organizationId)

        res.json({
            message: 'Criteria deleted',
            criteria
        })
    }
    catch(err) {
        next(err)
    }
}