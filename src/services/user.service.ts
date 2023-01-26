import { UserDto } from '@models/user.dto'
import { Permission, PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const allUsers = async () => {
    return prisma.user.findMany({
        where: {
            status: 'active'
        }
    })
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
    return prisma.user.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })

}


export const updateUserName = async (id: number, username: string) => {

    return prisma.user.update({
        where: {
            id
        },
        data: {
            username
        }
    })
}

export const checkUsernameUnique = async (userId: number, username: string) => {
    const user = await findUser(username)
    if (!user) {
        return true
    }
    
    return user.id === userId
}

export const updateUserPassword = async (id: number, password: string) => {
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))

    return prisma.user.update({
        where: {
            id
        },
        data: {
            password: hashedPassword
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

export const allUsersCount = async () => {
    return prisma.user.aggregate({
        _count: { 
            id: true
        }
    })
}

export const createUser = async (data: UserDto) => {
    const hashedPassword = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))
    
    return prisma.user.create({
        data: {
            username: data.username,
            password: hashedPassword,
            permissions: data.permissions
        }
    })
}