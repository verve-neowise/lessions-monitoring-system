import { deleteGroup, isGroupExists } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isGroupExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }

        const group = await deleteGroup(id)

        res.json({
            message: "Group deleted.",
            group
        })
    }
    catch(err) {
        next(err)
    }
}