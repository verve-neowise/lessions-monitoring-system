import { GroupDto } from '@models/index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allGroups = async () => {
    return prisma.group.findMany()
}

export const findGroupById = async (id: number) => {
    return prisma.group.findUnique({
        where: {
            id
        }
    })
}

export const isGroupExists = async (id: number) => {
    const group = await findGroupById(id)
    return group !== null
}

export const createGroup = async (data: GroupDto) => {
    const { name, directionId } = data
    return prisma.group.create({
        data: {
            name,
            direction: {
                connect: {
                    id: directionId
                }
            }
        }
    })
}

export const updateGroup = async (id: number, data: any) => {
    return prisma.group.update({
        where: {
            id
        },
        data: data
    })
}

export const deleteGroup = async (id: number) => {
    return prisma.group.delete({
        where: {
            id
        }
    })
}

export const allGroupsCount = async () => {
    return prisma.group.aggregate({
       _count: { }
    })
}