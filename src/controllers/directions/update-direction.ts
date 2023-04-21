import { isDirectionByNameExists, isDirectionExists, updateDirection } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const organizationId = +req.params.orgId 

        const id = +req.params.id

        const { name } = req.body

        const find = await isDirectionByNameExists(organizationId, name)

        if (find) {
            return res.status(400).json({
                message: 'direction with name ' + name + ' already exists'
            })
        }

        if (await isDirectionExists(organizationId, id)) {
            
            const direction = await updateDirection(id, name)

            res.json({
                message: `direction ${id} updated.`,
                direction
            })
        }
        else {
            res.status(404).json({
                message: `Direction not found.`
            })
        }
    }
    catch(err) {
        next(err)
    }
}