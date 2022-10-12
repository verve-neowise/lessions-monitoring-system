import { createAdmin } from '@services/admin.service';
import { UserDto } from '@models/user.dto';
import { AdminDto } from '@models/index';
import { createUser, findUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password, permissions } = req.body

        const existsUser = await findUser(username)

        if (existsUser) {
            return res.status(403).json({
                message: `user with username ${username} already exists.`
            })
        }

        const userDto: UserDto = {
            username,
            password,
            role: 'admin',
            permissions
        }

        const user = await createUser(userDto)

        const { name } = req.body
        
        const adminDto: AdminDto = {
            userId: user.id,
            name
        }

        const admin = await createAdmin(adminDto)

        res.json({
            message: "Admin created.",
            admin: {
                id: admin.id,
                userId: user.id,
                name: admin.name,
                username: user.username,
                password: user.password,
                permissions: user.permissions,
                role: user.role
            }
        })
    }
    catch(err) {
        next(err)
    }
}