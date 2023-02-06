import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getTeacherDirections = async (id: number) => {
    return prisma.teacher.findUnique({
        where: {
            id
        },
        select: {
            directions: true,
        }
    })    
}

export const addTeacherDirection = async (id: number, directionId: number) => {
    return prisma.teacher.update({
        where: {
            id
        },
        data: {
            directions: {
                connect: {
                    id: directionId
                }
            }
        }
    })    
}

export const addTeacherDirections = async (id: number, directions: number[]) => {
    return prisma.teacher.update({
        where: {
            id
        },
        data: {
            directions: {
                connect: directions.map(directionId => ({
                    id: directionId
                }))
            }
        }
    })    
}

export const deleteTeacherDirection = async (id: number, directionId: number) => {
    return prisma.teacher.update({
        where: {
            id
        },
        data: {
            directions: {
                disconnect: {
                    id: directionId
                }
            }
        }
    })    
}

export const deleteTeacherDirections = async () => {
    return prisma.teacher.update({
        where: {
        },
        data: {
            directions: {
                set: []
            }
        }
    })    
}