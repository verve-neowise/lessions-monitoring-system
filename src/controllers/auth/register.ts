import { Request, Response, NextFunction } from 'express';

import { Payload } from '@models/index';

import { findUser, createUser } from '@services/user.service';
import { sign } from '@services/jwt.service';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

    const { username, password } = req.body

    let user = await findUser(username)

    if (user) {
        return res.status(403).send({ message: `username ${username} already taken` })
    }

    let newUser = await createUser(-1, {
        username, 
        password,
        permissions: []
    })

    const payload: Payload = {
        userId: newUser.id,
        username: newUser.username,
        orgId: -1,
        permissions: [],
    }

    const token = await sign(payload)

    res.json({
        userId: payload.userId,
        username: payload.username,
        permissions: payload.permissions,
        organization: payload.orgId,
        token
    })
    }
    catch(err) {
        next(err)
    }
}