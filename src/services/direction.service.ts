import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allDirections = async (organizationId: number) => {
    return prisma.direction.findMany({
        where: {
            organizationId,
            status: 'active'
        }
    })
}

export const allDirectionsWithGroup = async (organizationId: number) => {
    return prisma.direction.findMany({
        include: {
            groups: {
                where: {
                    status: 'active'
                },
                select: {
                    id: true,
                    name: true,
                    students: {
                        select: {
                            id: true,
                            name: true,
                            surname: true,
                        },
                        where: {
                            status: 'active'
                        }
                    }
                }
            },
            teachers: {
                select: {
                    id: true,
                    name: true,
                    surname: true
                }
            }
        },
        where: {
            organizationId,
            status: 'active'
        }
    })
}

export const findDirectionById = async (organizationId: number, id: number) => {
    return prisma.direction.findFirst({
        where: {
            id,
            organizationId
        }
    })
}

export const isDirectionExists = async (organizationId: number, id: number) => {
    const direction = await findDirectionById(organizationId, id)
    return direction !== null
}

export const createDirection = async (orgId: number, name: string) => {
    return prisma.direction.create({
        data: {
            name,
            organization: {
                connect: {
                    id: orgId
                }
            }
        }
    })
}

export const updateDirection = async (id: number, name: string) => {
    return prisma.direction.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}

export const deleteDirection = async (id: number) => {
    return prisma.direction.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })
}

export const allDirectionsCount = async (orgId: number) => {
    return prisma.direction.count({
        where: {
            organizationId: orgId
        }
    })
}

export const isDirectionBelongsToOrganization = async (orgId: number, directionId: number) => {
    const direction = await prisma.direction.findFirst({
        where: {
            organizationId: orgId,
            id: directionId
        }
    })

    return direction != null
}