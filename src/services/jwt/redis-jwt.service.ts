import * as redis from 'redis'
import JWTR from 'jwt-redis'

import { Payload } from "@models/index"
import jwtConfig from '@configs/jwt.config'

const { secret, refreshExpiresIn, accessExpiresIn } = jwtConfig

const client: redis.RedisClientType = redis.createClient();

const jwtr = new JWTR(client);

client.connect()

export const signRefreshToken = async (payload: any) => {
    return jwtr.sign(payload, secret, {
        expiresIn: refreshExpiresIn
    })
}

export const signAccessToken = async (payload: any) => {
    return jwtr.sign(payload, secret, {
        expiresIn: accessExpiresIn
    })
}

export const verify = async (token: string) => {
    return await jwtr.verify(token, secret) as Payload
}