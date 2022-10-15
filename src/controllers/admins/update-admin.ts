import { checkUsernameUnique, findUserById, updateUserName, updateUserPassword } from '@services/user.service';
import { findAdminById } from '@services/admin.service';
import { findUser, updatePermissions, updateUser } from '@services/user.service';
import { isAdminExists, updateAdmin } from '@services/admin.service';
import { AdminDto, UserDto } from '@models/index';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const { name, username, password, permissions } = req.body

        const oldAdmin = await findAdminById(id)
        

        if (!oldAdmin) {
            return res.status(403).json({
                message: "Admin not found: " + id
            })
        }

        const { userId } = oldAdmin

        const isUsernameUnique = await checkUsernameUnique(userId, username)

        if (!isUsernameUnique) {
            return res.status(403).json({
                message: "User with username: " + username + " already exists"
            })
        }

        // update username and password
        if (username.length > 0 && password.length > 0) {
            await updateUser(userId, username, password)
        }
        // update only username
        else if (username.length > 0) {
            await updateUserName(userId, username)
        }
        // update only password
        else if (password.length > 0) {
            await updateUserPassword(userId, password)
        }

        const adminDto: AdminDto = {
            name
        }

        const admin = await updateAdmin(id, adminDto)
        let user = (await findUserById(userId))!
        
        const updatePermission = await updatePermissions(userId, permissions)

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