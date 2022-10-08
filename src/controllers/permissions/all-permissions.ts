import { Permission } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        let permissions = Object.values(Permission)

        res.json({
            message: "All permissions",
            permissions
        })
    }
    catch(err) {
        next(err)
    }
}