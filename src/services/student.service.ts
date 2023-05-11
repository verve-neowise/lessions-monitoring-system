import { StudentDto } from '@models/index'
import { EntityStatus, PrismaClient, Student } from '@prisma/client'

const prisma = new PrismaClient()

export const allStudents = async (organizationId: number, status: EntityStatus) => {
    return prisma.student.findMany({
        where: {
            user: {
                organizationId
            },
            status: status
        },
        include: {
            user: true,
            groups: {
                select: {
                    id: true,
                    name: true,
                    status: true,
                    direction: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const findStudentById = async (organizationId: number, id: number) => {
    return prisma.student.findFirst({
        where: {
            id,
            user: {
                organizationId
            },
        },
    })
}

export const findStudentWithDetails = async (organizationId: number, id: number) => {

    return prisma.student.findFirst({
        where: {
            id,
            user: {
                organizationId
            }
        },
        include: {
            user: true,
            groups: {
                select: {
                    id: true,
                    name: true,
                    status: true,
                    direction: true
                }
            }
        }
    })
}

export const findStudentByUserId = async (organizationId: number, userId: number) => {
    return prisma.student.findFirst({
        where: {
            userId,
            user: {
                organizationId
            }
        }
    })
}

export const isStudentExists = async (organizationId: number, id: number) => {
    const student = await findStudentById(organizationId, id)
    return student !== null
}

export const createStudent = async (data: StudentDto) => {

    const { name, surname, birthday, phone } = data

    return prisma.student.create({
        data: {
            userId: data.userId!,
            name,
            surname,
            birthday: new Date(), // TODO: delete after
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

export const allStudentsCount = async (organizationId: number, status: EntityStatus) => {
    return prisma.student.count({
        where: {
            user: {
                organizationId,
                status
            }
        }
    })
}

export const isStudentBelongsToOrganization = async (organizationId: number, studentId: number) => {
    const student = await prisma.student.findFirst({
        where: {
            user: {
                organizationId
            },
            id: studentId
        }
    })
    return student != null
}


export const recoverStudent = async (studentId: number) => {
    return await prisma.student.update({
        where: {
            id: studentId
        },
        data: {
            status: 'active'
        }
    })
}