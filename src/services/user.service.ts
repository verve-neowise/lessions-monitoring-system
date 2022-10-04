import { Permission, User, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allUsers = async () => {
    return prisma.user.findMany()
}

export const findUser = async (username: string) => {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}

export const createUser = async (username: string, password: string, permissions: Permission[]) => {
    return prisma.user.create({
        data: {
            username,
            password,
            permissions
        }
    })
}