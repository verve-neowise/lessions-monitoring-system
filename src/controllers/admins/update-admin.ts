import { updateUserPassword } from './../../services/user.service';
import { findAdminById } from './../../services/admin.service';
import { Role } from '@prisma/client';
import { findUser, updatePermissions, updateUser } from '@services/user.service';
import { isAdminExists, updateAdmin } from '@services/admin.service';
import { AdminDto, UserDto } from '@models/index';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await findAdminById(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Admin not found: " + id
            })
        }

        const { name, username, password, permissions } = req.body

        const userFind = await findUser(username)

        if (userFind && find.userId !== userFind.id) {
            return res.status(403).json({
                message: "User with username: " + username + " already exists"
            })
        }

        const dto: AdminDto = {
            name
        }

        const admin = await updateAdmin(id, dto)
        let user;

        if (userFind) {
           user = await updateUserPassword(admin.userId, password)
        }
        else {
            user = await updateUser(admin.userId, username, password)
        }
        
        const updatePermission = await updatePermissions(admin.userId, permissions)

        res.json({
            message: "Admin updated.",
            admin: {
                id: admin.id,
                userId: user.id,
                name: admin.name,
                username: user.username,
                permissions: updatePermission.permissions,
                role: user.role
            }
        })
    }
    catch(err) {
        next(err)
    }
}