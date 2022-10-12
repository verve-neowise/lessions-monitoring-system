import { createAdmin } from '@services/admin.service';
import { UserDto } from '@models/user.dto';
import { AdminDto } from '@models/index';
import { createUser, findUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { username, password } = req.body

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
            permissions: ['profile', 'dashboard', 'directions', 'groups', 'students', 'teachers']
        }

        const user = await createUser(userDto)

        const { name, surname } = req.body
        
        const adminDto: AdminDto = {
            userId: user.id,
            name,
            surname,
        }

        const student = await createAdmin(adminDto)

        res.json({
            message: "Admin created.",
            student
        })
    }
    catch(err) {
        next(err)
    }
}