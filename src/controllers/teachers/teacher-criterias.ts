import { findTeacherCriterias } from '@services/criteria.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId

        const criterias = await findTeacherCriterias(organizationId, id)

        res.json({
            message: 'Retrive teacher criterias',
            teacherId: id,
            criterias
        })
    }
    catch(err) {
        next(err)
    }
}