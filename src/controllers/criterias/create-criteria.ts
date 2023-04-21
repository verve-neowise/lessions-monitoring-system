import { CriteriaDto } from '@models/criteria.dto';
import { createCriteria } from '@services/criteria.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId

        const criteriaDto: CriteriaDto = req.body

        const maxScorings = criteriaDto.scorings.reduce((acc, scoring) => acc + scoring.value, 0)

        if (criteriaDto.maximum != maxScorings) {
            return res.status(400).json({
                message: 'Scorings and max value dont matching'
            })
        }

        const criteria = await createCriteria(organizationId, criteriaDto)

        res.json({
            message: 'Criteria created',
            criteria
        })
    }
    catch(err) {
        next(err)
    }
}