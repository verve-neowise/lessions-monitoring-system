import { Role } from '@prisma/client';
import { createUser, findUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const { username, password, permissions } = req.body

        const oldUser = await findUser(username)

        if (oldUser) {
            return res.status(403).json({
                message: `user with username ${username} already exists.`
            })
        }

        let newUser = await createUser({
            username, 
            password,
            role: Role.none, 
            permissions
        })

        res.json({
            message: "User successfuly created.",
            user: {
                username,
                role: newUser.role,
                permissions: newUser.permissions
            }
        })
     }
    catch(err) {
        next(err)
    }
}