import { Request, Response, NextFunction } from 'express';

import { verify } from '@services/jwt.service';
import { signAccessToken } from '@services/jwt/redis-jwt.service';

export default async (req: Request, res: Response, next: NextFunction) => {

    try {
        const refreshToken = req.header("refresh-token")

        if (!refreshToken) {
            return res.status(401).json({
                message: "Access Denied. No refresh token provided"
            })
        }

        const payload = await verify(refreshToken)

        const accessToken = await signAccessToken(payload)

        res.json({
            message: "Success refresh access token",
            accessToken
        })
    }
    catch(err) {
        return res.status(400).json({
            message: "Invalid refresh token"
        })
    }
}