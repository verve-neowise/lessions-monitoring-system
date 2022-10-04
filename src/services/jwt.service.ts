import jwt from "jsonwebtoken"
import { jwtConfig } from "../configs"
import { Payload } from "../models"


const { secret, expiresIn } = jwtConfig

export const sign = (payload: any) => {
    return jwt.sign(payload, secret, {
        expiresIn: expiresIn
    })
}

export const verify = (token: string) => {
    return jwt.verify(token, secret) as Payload
}