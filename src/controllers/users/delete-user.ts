import { deleteUser, findUserById } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const id = +req.params.id
        const find = await findUserById(id)

        if (!find) {
            return res.status(403).json({
                message: `user ${id} not found.`
            })
        }

        const user = await deleteUser(id)

        const { username, permissions } = user

        res.json({
            message: `User ${id} was deleted.`,
            username,
            permissions
        })
    }
    catch(err) {
        next(err)
    }
}