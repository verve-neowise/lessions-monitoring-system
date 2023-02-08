import { createDirection, isDirectionByNameExists } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const organizationId = +req.params.orgId 

        const { name } = req.body

        const find = await isDirectionByNameExists(organizationId, name)

        if (find) {
            return res.status(400).json({
                message: 'direction with name ' + name + ' already exists'
            })
        }

        const direction = await createDirection(organizationId, name)
        
        res.json({
            message: "direction created.",
            direction
        })
    }
    catch(err) {
        next(err)
    }
}