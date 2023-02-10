import { EntityStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allDirections = async (organizationId: number, status: EntityStatus) => {
    return prisma.direction.findMany({
        where: {
            organizationId,
            status
        },
        orderBy: {
            id: 'asc'
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
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const findDirectionWithDetailsById = async (organizationId: number, id: number) => {
    return prisma.direction.findFirst({
        where: {
            id,
            organizationId,
        },
        include: {
            groups: {
                select: {
                    id: true,
                    name: true,
                    months: true,
                    teacher: true,
                    _count: {
                        select: {
                            students: true
                        }
                    }
                }
            },
            teachers: true,
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


export const isDirectionByNameExists = async (orgId: number, name: string) => {
    const find = await prisma.direction.findFirst({
        where: {
            organizationId: orgId,
            name: name.trim().toLowerCase()
        }
    })

    return find != null
}

export const createDirection = async (orgId: number, name: string) => {
    return prisma.direction.create({
        data: {
            name: name.trim().toLowerCase(),
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
            name: name.toLowerCase()
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

export const recoverDirection = async (directionId: number) => {
    return await prisma.direction.update({
        where: {
            id: directionId
        },
        data: {
            status: 'active'
        }
    })
}