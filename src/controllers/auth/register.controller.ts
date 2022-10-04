import { sign } from './../../services/jwt.service';
import { findUser, createUser } from './../../services/user.service';
import { NextFunction, Request,  Response } from 'express';
import { Payload } from '../../models';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

    const { username, password } = req.body

    let user = await findUser(username)

    if (user) {
        return res.status(403).send(`username ${username} already taken`)
    }

    let newUser = await createUser(username, password, [])

    const payload: Payload = {
        userId: newUser.id,
        username: newUser.username,
        permissions: []
    }

    const token = sign(payload)

    res.json({
        username: payload.username,
        permissions: payload.permissions,
        token
    })
    }
    catch(err) {
        next(err)
    }
}