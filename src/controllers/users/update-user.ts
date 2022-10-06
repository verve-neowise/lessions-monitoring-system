import { updateUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const id = +req.params.id
        const { username, password } = req.body

        const update = await updateUser(id, username, password)

        res.json({
            message: `user ${update.username} credentials updated.`,
            username
        })
    }
    catch(err) {
        next(err)
    }
}