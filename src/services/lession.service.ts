import { LessionDto } from '@models/lession.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allLessions = async () => {
    return prisma.lession.findMany()
}

export const createLessionsForCount = (groupId: number, count: number) => {
    
    const arr = Array.from(Array(count).keys())

    return prisma.lession.createMany({
        data: arr.map(date => {
            return {
                groupId,
                date
            }
        })
    })
}

export const findLessionByGroup = (groupId: number) => {
    return prisma.lession.findMany({
        where: {
            groupId
        }
    })
}

export const findLessionById = async (id: number) => {
    return prisma.lession.findUnique({
        where: {
            id
        }
    })
}

export const isLessionExists = async (id: number) => {
    const lession = await findLessionById(id)
    return lession !== null
}

export const createLession= async (data: LessionDto) => {
    return prisma.lession.create({
        data: data
    })
}

export const updateLession = async (id: number, data: LessionDto) => {
    return prisma.lession.update({
        where: {
            id
        },
        data: data
    })
}

export const deleteLession = async (id: number) => {
    return prisma.lession.delete({
        where: {
            id
        }
    })
}