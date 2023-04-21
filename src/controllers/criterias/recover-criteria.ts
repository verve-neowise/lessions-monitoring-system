import { deleteCriteria, isCriteriaExists, recoverCriteria } from '@services/criteria.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const isExists = await isCriteriaExists(organizationId, id)

        if (!isExists) {
            return res.status(404).json({
                message: `Criteria not found.`
            })            
        }

        const criteria = await recoverCriteria(id)

        res.json({
            message: 'Criteria recovered',
            criteria
        })
    }
    catch(err) {
        next(err)
    }
}