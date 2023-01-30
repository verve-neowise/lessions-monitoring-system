import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allDirections = async () => {
    return prisma.direction.findMany({
        where: {
            status: 'active'
        }
    })
}

export const allDirectionsWithGroup = async () => {
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
            status: 'active'
        }
    })
}

export const findDirectionById = async (id: number) => {
    return prisma.direction.findUnique({
        where: {
            id
        }
    })
}

export const isDirectionExists = async (id: number) => {
    const direction = await findDirectionById(id)
    return direction !== null
}

export const createDirection = async (name: string) => {
    return prisma.direction.create({
        data: {
            name
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

export const allDirectionsCount = async () => {
    return prisma.direction.count()
}