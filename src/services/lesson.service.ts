import { PrismaClient, Lesson } from ".prisma/client"
import { LessonDto } from "@models/lesson.dto"

const prisma = new PrismaClient()

export const getLessons = async (groupId: number) => {
    return prisma.lesson.findMany({
        where: {
            groupId,
        },
        include: {
            criteria: true
        }
    })
}

export const createLesson = async (groupId: number, lesson: LessonDto) => {
    return prisma.lesson.create({
        data: {
            title: lesson.title,
            date: new Date(lesson.date),
            type: lesson.type,
            group: {
                connect: {
                    id: groupId
                }
            },
            criteria: {
                connect: {
                    id: lesson.criteria
                }
            },
            material: {
                create: {
                    content: '',
                }
            }
        },
        select: {
            id: true,
            title: true,
            date: true,
            material: true,
            criteria: true,
            type: true
        }
    })    
}

export const updateLessonMaterial = async (lessonId: number, content: string) => {
    return prisma.lesson.update({
        where: {
            id: lessonId
        },
        data: {
            material: {
                update: {
                    content
                }
            }
        },
        select: {
            material: {
                select: {
                    content: true
                }
            }
        }
    })
}

export const updateLesson = async (lessonId: number, lessonDto: LessonDto) => {
    return prisma.lesson.update({
        data: {
            title: lessonDto.title,
            date: new Date(lessonDto.date),
            criteria: {
                connect: {
                    id: lessonDto.criteria
                }
            },
            type: lessonDto.type
        },
        include: {
            criteria: true
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
            material: true,
            criteria: true
        }
    })
}

export const getLessonMaterial = async (lessonId: number) => {
    return prisma.lesson.findUnique({
        where: {
            id: lessonId
        },
        select: {
            material: {
                select: {
                    content: true
                }
            }
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