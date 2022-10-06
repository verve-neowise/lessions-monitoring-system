import { allUsers } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const users = await allUsers()

        res.json({
            message: "All users",
            users
        })
    }
    catch(err) {
        next(err)
    }
}