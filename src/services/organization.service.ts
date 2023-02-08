import { OrganizationDto } from '@models/index'
import { EntityStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allOrganizations = async (status: EntityStatus) => {
    return prisma.organization.findMany({
        where: {
            status
        }
    })
}

export const findOrganizationById = async (id: number) => {
    return prisma.organization.findUnique({
        where: {
            id
        }
    })
}

export const isOrganizationExists = async (id: number) => {
    const organization = await findOrganizationById(id)
    return organization !== null
}

export const createOrganization = async (data: OrganizationDto) => {
    const { name } = data
    return prisma.organization.create({
        data: {
            name: name
        }
    })
}

export const updateOrganization = async (id: number, data: OrganizationDto) => {

    const { name } = data

    return prisma.organization.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}

export const deleteOrganization = async (id: number) => {
    return prisma.organization.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })
}


export const recoverOrganization = async (id: number) => {
    return prisma.organization.update({
        where: {
            id
        },
        data: {
            status: 'active'
        }
    })
}

export const allOrganizationsCount = async () => {
    return prisma.organization.count()
}