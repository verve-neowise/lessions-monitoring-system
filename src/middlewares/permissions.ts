import { Permission } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

import { verify } from '@services/jwt.service';

export default (...permissions: Permission[]) => {

    return (req: Request, res: Response, next: NextFunction) => {
        let token = req.header('authorization')

        console.log("permissions");
        

        if (!token) {
            return res.status(401).send({
                message: 'Token not provided'
            })
        }

        console.log("token valid");

        try {
            console.log("verify payload");

            let payload = verify(token)
            res.locals.payload = payload

            console.log(`user ${payload.userId}: ` + payload.permissions);
            
            let missing = permissions
                            .filter( permission => !payload.permissions.includes(permission) )

            console.log(missing);

            if (missing.length == 0) {
                next()
            }
            else {
                res.status(403).send({
                     message: 'Access denied. Required permissions ' + missing
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

