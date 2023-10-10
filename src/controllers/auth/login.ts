import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";

import { Payload } from '@models/index';

import { findUser } from '@services/user.service';
import { sign as signRefreshToken } from '@services/jwt.service';
import { signAccessToken } from '@services/jwt/redis-jwt.service';

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
    
            const refreshToken = await signRefreshToken(payload) // 48h
            const accessToken = await signAccessToken(payload) // 4h

            res.json({
                userId: user.id,
                username: user.username,
                permissions: user.permissions,
                organizationId: user.organizationId,
                refreshToken,
                accessToken
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