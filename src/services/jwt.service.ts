import * as redisJwt from './jwt/local-jwt.service'

const { sign, verify } = redisJwt

export {
    sign,
    verify
}