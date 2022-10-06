import { Permission, User, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

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


export const findUserById = async (id: number) => {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}


export const deleteUser = async (id: number) => {
    return prisma.user.delete({
        where: {
            id
        }
    })
}

export const updateUser = async (id: number, username: string, password: string) => {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    return prisma.user.update({
        where: {
            id
        },
        data: {
            username,
            password: hashedPassword
        }
    })
}

export const updatePermissions = async (id: number, permissions: Permission[]) => {
    return prisma.user.update({
        where: {
            id
        },
        data: {
            permissions
        }
    })
}

export const createUser = async (username: string, password: string, permissions: Permission[]) => {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    return prisma.user.create({
        data: {
            username,
            password: hashedPassword,
            permissions
        }
    })
}