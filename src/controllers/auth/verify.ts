import { Payload } from '@models/index'
import { NextFunction, Request, Response } from 'express'

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload: Payload = res.locals.payload

        const { userId, username, permissions, orgId } = payload

        res.json({
            userId,
            username,
            permissions,
            organizationId: orgId
        })
    } catch (err) {
        next(err)
    }
}
