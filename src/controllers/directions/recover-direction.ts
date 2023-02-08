import { deleteDirection, isDirectionExists, recoverDirection } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const organizationId = +req.params.orgId 

        const id = +req.params.id

        if (await isDirectionExists(organizationId, id)) {
            const direction = await recoverDirection(id)

            res.json({
                message: "direction recovered.",
                direction
            })
        }
        else {
            res.status(404).json({
                message: `Recovered not found.`
            })
        }

    }
    catch(err) {
        next(err)
    }
}