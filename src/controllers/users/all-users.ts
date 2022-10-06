import { allUsers } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const users = await allUsers()

        const mapped = users.map(user => {
            const { username, id, permissions } = user
            return {
                id,
                username,
                permissions
            }
        })

        res.json({
            message: "All users",
            users: mapped
        })
    }
    catch(err) {
        next(err)
    }
}