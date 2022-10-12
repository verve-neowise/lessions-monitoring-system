import { TeacherDto } from '@models/teacher.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allTeachers = async () => {
    return prisma.teacher.findMany({
        where: {
            status: 'active'
        },
        include: {
            user: true,
            groups: {
                where: {
                    status: 'active'
                }
            },
            directions: {
                where: {
                    status: 'active'
                }
            }
        }
    })
}

export const findTeacherById = async (id: number) => {
    return prisma.teacher.findUnique({
        where: {
            id
        }
    })
}

export const findTeacherByUserId = async (userId: number) => {
    return prisma.teacher.findUnique({
        where: {
            userId
        }
    })
}

export const isTeacherExists = async (id: number) => {
    const teacher = await findTeacherById(id)
    return teacher !== null
}

export const createTeacher = async (data: TeacherDto) => {

    const { name, surname, birthday, phone, directions } = data

    return prisma.teacher.create({
        data: {
            userId: data.userId!,
            name,
            surname,
            birthday,
            phone,
            directions: {
                connect: directions.map(id => {
                    return { id }
                })
            }
        }
    })
}

export const updateTeacher = async (id: number, data: TeacherDto) => {
    
    const { name, surname, birthday, phone, directions } = data

    return prisma.teacher.update({
        where: {
            id
        },
        data: {
            name,
            surname,
            birthday,
            phone,
            directions: {
                connect: directions.map(id => {
                    return { id }
                })
            }
        }
    })
}

export const deleteTeacher = async (id: number) => {
    return prisma.teacher.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })
}

export const allTeachersCount = async () => {
    return prisma.teacher.aggregate({
       _count: { 
            id: true
        }
    })
}
