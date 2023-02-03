import { createUser, findUser } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const organizationId = +req.params.orgId 

        const orgId = +req.params.org

        const { username, password, permissions } = req.body

        const oldUser = await findUser(username)

        if (oldUser) {
            return res.status(403).json({
                message: `user with username ${username} already exists.`
            })
        }

        let newUser = await createUser(organizationId, {
            username, 
            password,
            permissions
        })

        res.json({
            message: "User successfuly created.",
            user: {
                username,
                organization: orgId,
                permissions: newUser.permissions
            }
        })
     }
    catch(err) {
        next(err)
    }
}