import { isDirectionExists, updateDirection } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const id = +req.params.id

        const { name } = req.body

        if (await isDirectionExists(id)) {
            
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