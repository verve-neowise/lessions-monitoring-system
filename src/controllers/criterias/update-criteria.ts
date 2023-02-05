import { CriteriaDto } from '@models/criteria.dto';
import { isCriteriaExists, updateCriteria } from '@services/criteria.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const organizationId = +req.params.orgId
        const criteriaDto: CriteriaDto = req.body

        const maxScorings = criteriaDto.scorings.reduce((acc, scoring) => acc + scoring.value, 0)

        if (criteriaDto.maximum != maxScorings) {
            return res.status(400).json({
                message: 'Scorings and max value dont matching'
            })
        }

        const isExists = await isCriteriaExists(organizationId, id)

        if (!isExists) {
            return res.status(404).json({
                message: `Direction not found.`
            })            
        }

        const criteria = await updateCriteria(id, criteriaDto)

        res.json({
            message: 'Criteria updated',
            criteria
        })
    }
    catch(err) {
        next(err)
    }
}