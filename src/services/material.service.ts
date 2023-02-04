import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const createMaterial = async (lessonId: number, content: string) => {
    return prisma.material.create({
        data: {
            content,
            lesson: {
                connect: {
                    id: lessonId                    
                }
            }
        }
    })
}

const updateMaterial = async (id: number, content: string) => {
    return prisma.material.update({
        data: {
            content
        },
        where: {
        }
    })
}

const deleteMaterial = async (id: number) => {
    return prisma.material.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })
}

