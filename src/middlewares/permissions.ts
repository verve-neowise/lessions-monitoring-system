import { Permission } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { serverConfig } from '@configs/index'

import { verify } from '@services/jwt.service';

export default (...permissions: Permission[]) => {

    return async (req: Request, res: Response, next: NextFunction) => {
        
        let token = req.header('authorization')

        if (req.header('x-supervisor-key') == serverConfig.supervisorKey && (permissions.includes('surpervisor') || permissions.includes('admin'))) {
            return next()
        }

        if (!token) {
            return res.status(401).send({
                message: 'Token not provided'
            })
        }

        try {
            let payload = await verify(token)

            res.locals.payload = payload

            let hasAccess = permissions.some(permission => payload.permissions.includes(permission))

            if (hasAccess || permissions.length == 0) {
                
                const orgId = +req.params.orgId

                if (orgId != payload.orgId) {
                    return res.status(403).json({
                        message: 'Access denied to this organization'
                    })
                }

                next()
            }
            else {
                res.status(403).send({
                     message: 'Access denied. Required permissions ' + permissions
                })
            }
        }
        catch(err) {
            return res.status(401).send({ 
                message: 'invalid token'
            })
        }
    }
}

