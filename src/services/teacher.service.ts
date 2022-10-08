import { TeacherDto } from '@models/teacher.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allTeachers = async () => {
    return prisma.teacher.findMany()
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

    const { name, surname, birthday, phone } = data

    return prisma.teacher.create({
        data: {
            userId: data.userId,
            name,
            surname,
            birthday,
            phone
        }
    })
}

export const updateTeacher = async (id: number, data: any) => {
    return prisma.teacher.update({
        where: {
            id
        },
        data: data
    })
}

export const deleteTeacher = async (id: number) => {
    return prisma.teacher.delete({
        where: {
            id
        }
    })
}