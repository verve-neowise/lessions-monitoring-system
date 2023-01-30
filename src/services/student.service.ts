import { StudentDto } from '@models/index'
import { PrismaClient, Student } from '@prisma/client'

const prisma = new PrismaClient()

export const allStudents = async () => {
    return prisma.student.findMany({
        where: {
            status: 'active'
        },
        include: {
            user: true,
            groups: {
                where: {
                    status: 'active'
                }
            }
        }
    })
}

export const findStudentById = async (id: number) => {
    return prisma.student.findUnique({
        where: {
            id
        }
    })
}

export const findStudentByUserId = async (userId: number) => {
    return prisma.student.findUnique({
        where: {
            userId
        }
    })
}

export const isStudentExists = async (id: number) => {
    const student = await findStudentById(id)
    return student !== null
}

export const createStudent = async (data: StudentDto) => {

    const { name, surname, birthday, phone } = data

    return prisma.student.create({
        data: {
            userId: data.userId!,
            name,
            surname,
            birthday,
            phone
        }
    })
}

export const updateStudent = async (id: number, data: StudentDto) => {

    const { name, surname, phone, birthday } = data

    return prisma.student.update({
        where: {
            id
        },
        data: {
            name,
            surname,
            phone,
            birthday
        },
        include: {
            groups: true
        }
    })
}

export const deleteStudent = async (id: number) => {
    return prisma.student.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })
}

export const allStudentsCount = async () => {
    return prisma.student.count()
}