import { PrismaClient } from ".prisma/client"
import { LessonDto } from "@models/lesson.dto"

const prisma = new PrismaClient()

export const getLessons = async (groupId: number) => {
    return prisma.lesson.findMany({
        where: {
            groupId
        }
    })
}

export const createLesson = async (groupId: number, lesson: LessonDto) => {
    return prisma.lesson.create({
        data: {
            title: lesson.title,
            date: lesson.date,
            group: {
                connect: {
                    id: groupId
                }
            },
            material: {
                create: {
                    content: ''
                }
            }
        },
        select: {
            id: true,
            title: true,
            date: true,
            material: true
        }
    })    
}

export const updateLesson = async (lessonId: number, lessonDto: LessonDto) => {
    return prisma.lesson.update({
        data: {
            title: lessonDto.title,
            date: lessonDto.date,
        },
        where: {
            id: lessonId
        }
    })
}

export const deleteLesson = async (lessonId: number) => {
    return prisma.lesson.delete({
        where: {
            id: lessonId
        },
        include: {
            material: true
        }
    })
}

export const setLessonMaterial = async (lessonId: number, materialId: number) => {
    return prisma.lesson.update({
        where: {
            id: lessonId
        },
        data: {
            material: {
                connect: {
                    id: materialId
                }
            }
        }
    })
}