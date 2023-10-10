export default {
    secret: process.env.JWT_SECRET!,
    refreshExpiresIn: process.env.REFRESH_EXPIRES_IN!,
    accessExpiresIn: process.env.ACCESS_EXPIRES_IN!,
}