import { AdminDto } from '@models/index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allAdmins = async (organizationId: number) => {
    return prisma.admin.findMany({
        where: {
            status: 'active',
            user: {
                organizationId
            }
        },
        include: {
            user: true
        }
    })
}

export const findAdminById = async (organizationId: number, id: number) => {
    return prisma.admin.findFirst({
        where: {
            id,
            user: {
                organizationId
            }
        }
    })
}

export const findAdminByUserId = async (organizationId: number, userId: number) => {
    return prisma.admin.findFirst({
        where: {
            userId,
            user: {
                organizationId
            }
        }
    })
}

export const isAdminExists = async (organizationId: number ,id: number) => {
    const admin = await findAdminById(organizationId, id)
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

export const allAdminsCount = async (organizationId: number) => {
    return prisma.admin.count({
        where: {
            user: {
                organizationId
            }
        }
    })
}

export const isAdminBelongsToOrganization = async (organizationId: number, adminId: number) => {
    const admin = await prisma.admin.findFirst({
        where: {
            user: {
                organizationId
            },
            id: adminId
        }
    })
    return admin != null
}