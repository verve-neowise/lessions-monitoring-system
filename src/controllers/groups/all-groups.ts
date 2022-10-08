import { allGroups } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const groups = await allGroups()
        
        res.json({
            message: "All groups",
            groups
        })
    }
    catch(err) {
        next(err)
    }
}