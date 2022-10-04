import { findUser } from './../../services/user.service';
import bcrypt from 'bcrypt'

import { Request, Response, NextFunction } from 'express';
import { Payload } from '../../models';
import { sign } from '../../services/jwt.service';

export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { username, password } = req.body

        const user = await findUser(username)
    
        if (!user) {
            return res.status(401).send('Username or password wrong')
        }
    
        if (bcrypt.compareSync(user.password, password)) {
            const payload: Payload = {
                userId: user.id,
                username: user.username,
                permissions: user.permissions
            }
    
            const token = sign(payload)
    
            res.json({
                username: user.username,
                permissions: user.permissions,
                token
            })
        }
        else {
            res.status(401).send('Username or password wrong')
        }
    }
    catch(err) {
        next(err)
    }
}