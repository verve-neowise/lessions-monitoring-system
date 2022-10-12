import { allAdmins } from '@services/admin.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await allAdmins()
        
        res.json({
            message: "All admins",
            admins
        })
    }
    catch(err) {
        next(err)
    }
}