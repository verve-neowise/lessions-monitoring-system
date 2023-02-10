import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";

import { Payload } from '@models/index';

import { findUser } from '@services/user.service';
import { sign } from '@services/jwt.service';

export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username, password } = req.body
   
        const user = await findUser(username)
    
        if (!user) {
            return res.status(401).send({ message: 'Username or password wrong'} )
        }
        
        if (user.status != 'active') {
            return res.status(401).send({
                message: 'Account has blocked'
            })
        }

        if (bcrypt.compareSync(password, user.password)) {
            const payload: Payload = {
                userId: user.id,
                username: user.username,
                permissions: user.permissions,
                orgId: user.organizationId
            }
    
            const token = await sign(payload)
    
            res.json({
                userId: user.id,
                username: user.username,
                permissions: user.permissions,
                organizationId: user.organizationId,
                token
            })
        }
        else {
            res.status(401).send({ message: 'Username or password wrong'})
        }
    }
    catch(err) {
        next(err)
    }
}