import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allDirections = async () => {
    return prisma.direction.findMany({
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
    return prisma.teacher.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })
}

export const allDirectionsDetails = async () => {
    return prisma.direction.findMany({
        include: {
            groups: {
                include: {
                    _count: true
                }
            }
        }
    })
}

export const allDirectionsCount = async () => {
    return prisma.direction.aggregate({
       _count: { }
    })
}