import * as redisJwt from './jwt/redis-jwt.service'
import * as localJwt from './jwt/local-jwt.service'
import { serverConfig } from '@configs/index'
 
const service = serverConfig.jwtEngine == 'redis' ? redisJwt : localJwt

const { sign, verify } = service

export {
    sign,
    verify
}