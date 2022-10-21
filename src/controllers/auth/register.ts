import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcrypt";

import { Payload } from '@models/index';

import { findUser, createUser } from '@services/user.service';
import { sign } from '@services/jwt.service';
import { Role } from '@prisma/client';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

    const { username, password } = req.body

    let user = await findUser(username)

    if (user) {
        return res.status(403).send({ message: `username ${username} already taken` })
    }

    let newUser = await createUser({
        username, 
        password,
        role: Role.none, 
        permissions: []
    })

    const payload: Payload = {
        userId: newUser.id,
        username: newUser.username,
        permissions: [],
        role: newUser.role
    }

    const token = sign(payload)

    res.json({
        userId: payload.userId,
        username: payload.username,
        permissions: payload.permissions,
        role: payload.role,
        token
    })
    }
    catch(err) {
        next(err)
    }
}