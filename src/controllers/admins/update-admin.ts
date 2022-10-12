import { Role } from '@prisma/client';
import { updatePermissions, updateUser } from '@services/user.service';
import { isAdminExists, updateAdmin } from '@services/admin.service';
import { AdminDto, UserDto } from '@models/index';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const find = await isAdminExists(id)
        
        if (!find) {
            return res.status(403).json({
                message: "Admin not found: " + id
            })
        }

        const { name, username, password, permissions } = req.body

        const dto: AdminDto = {
            name
        }

        const userDto: UserDto = {
            username,
            password,
            permissions,
            role: Role.admin
        }

        const admin = await updateAdmin(id, dto)
        const user = await updateUser(admin.userId, username, password)
        const updatePermission = await updatePermissions(admin.userId, permissions)

        res.json({
            message: "Admin updated.",
            admin: {
                id: admin.id,
                userId: user.id,
                name: admin.name,
                username: user.username,
                password: user.password,
                permissions: updatePermission.permissions,
                role: user.role
            }
        })
    }
    catch(err) {
        next(err)
    }
}