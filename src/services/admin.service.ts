import { AdminDto } from '@models/index'
import { Admin, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allAdmins = async () => {
    return prisma.admin.findMany({
        where: {
            status: 'active'
        },
        include: {
            user: true
        }
    })
}

export const findAdminById = async (id: number) => {
    return prisma.admin.findUnique({
        where: {
            id
        }
    })
}

export const findAdminByUserId = async (userId: number) => {
    return prisma.admin.findUnique({
        where: {
            userId
        }
    })
}

export const isAdminExists = async (id: number) => {
    const admin = await findAdminById(id)
    return admin !== null
}

export const createAdmin = async (data: AdminDto) => {

    const { name } = data
    return prisma.admin.create({
        data: {
            userId: data.userId!,
            name: name
        }
    })
}

export const updateAdmin = async (id: number, data: AdminDto) => {

    const { name } = data

    return prisma.admin.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}

export const deleteAdmin = async (id: number) => {
    return prisma.admin.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })
}


export const allAdminsCount = async () => {
    return prisma.admin.count({
        where: {
            user: {
                permissions: {
                    has: 'admin'
                }
            }
        }
    })
}