import { createAdmin } from '@services/admin.service';
import { UserDto } from '@models/user.dto';
import { AdminDto, AdminResponse } from '@models/index';
import { createUser, findUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password, permissions, name } = req.body

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

        
        const adminDto: AdminDto = {
            userId: user.id,
            name
        }

        const admin = await createAdmin(adminDto)

        const response: AdminResponse = {
            id: admin.id,
            userId: user.id,
            name: admin.name,
            username: user.username,
            permissions: user.permissions,
            role: user.role
        }

        res.json({
            message: "Admin created.",
            admin: response
        })
    }
    catch(err) {
        next(err)
    }
}