import { deleteDirection, isDirectionExists } from '@services/direction.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const id = +req.params.id

        if (await isDirectionExists(id)) {
            const direction = await deleteDirection(id)

            res.json({
                message: "direction deleted.",
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