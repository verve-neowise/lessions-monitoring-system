import { checkUsernameUnique, findUserById, updateUserName, updateUserPassword } from '@services/user.service';
import { findAdminById } from '@services/admin.service';
import { updatePermissions, updateUser } from '@services/user.service';
import { updateAdmin } from '@services/admin.service';
import { AdminDto, AdminResponse } from '@models/index';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const id = +req.params.id

        const { name, username, password, permissions } = req.body

        const oldAdmin = await findAdminById(organizationId, id)

        if (!oldAdmin) {
            return res.status(403).json({
                message: "Admin not found: " + id
            })
        }

        const { userId } = oldAdmin

        if (username) {
            const isUsernameUnique = await checkUsernameUnique(userId, username)

            if (!isUsernameUnique) {
                return res.status(403).json({
                    message: "User with username: " + username + " already exists"
                })
            }
        }


        // update username and password
        if (username && password && username.length > 0 && password.length > 0) {
            await updateUser(userId, username, password)
        }
        // update only username
        else if (username && username.length > 0) {
            await updateUserName(userId, username)
        }
        // update only password
        else if (password && password.length > 0) {
            await updateUserPassword(userId, password)
        }
        
        if (permissions && permissions.length > 0) {
            await updatePermissions(userId, permissions)
        }
        
        const adminDto: AdminDto = {
            name
        }


        const admin = await updateAdmin(id, adminDto)
        let user = (await findUserById(userId))!
        
        const response: AdminResponse = {
            id: admin.id,
            userId: user.id,
            name: admin.name,
            username: user.username,
            permissions: user.permissions,
        }

        res.json({
            message: "Admin updated.",
            admin: response
        })
    }
    catch(err) {
        next(err)
    }
}