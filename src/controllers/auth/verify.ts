import { Payload } from '@models/index'
import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: Payload = res.locals.payload

        const { userId, username, permissions, role } = payload

        res.json({
            userId,
            username,
            permissions,
            role
        })
    } catch (err) {
        next(err)
    }
}
