import { TeacherDto } from '@models/teacher.dto'
import { EntityStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allTeachers = async (organizationId: number, status: EntityStatus) => {
    return prisma.teacher.findMany({
        where: {
            status,
            user: {
                organizationId
            }
        },
        include: {
            user: true,
            groups: {
                include: {
                    direction: true,
                    _count: {
                        select: {
                            students: true,
                        }
                    }
                },
                where: {
                    status: 'active'
                }
            },
            directions: {
                where: {
                    status: 'active'
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const findTeacherById = async (organizationId: number, id: number) => {
    return prisma.teacher.findFirst({
        where: {
            id,
            user: {
                organizationId
            }
        }
    })
}


export const findTeacherWithDetailsById = async (organizationId: number, id: number) => {
    return prisma.teacher.findFirst({
        where: {
            id,
            user: {
                organizationId
            }
        },
        select: {
            id: true,
            name: true,
            surname: true,
            phone: true,
            status: true,
            directions: {
                select: {
                    id: true,
                    name: true,
                    status: true
                }
            },
            groups: {
                select: {
                    id: true,
                    name: true,
                    status: true
                }
            }
        }
    })
}

export const findTeacherByUserId = async (organizationId: number, userId: number) => {
    return prisma.teacher.findFirst({
        where: {
            userId,
            user: {
                organizationId
            }
        }
    })
}

export const isTeacherExists = async (organizationId: number, id: number) => {
    const teacher = await findTeacherById(organizationId, id)
    return teacher !== null
}

export const createTeacher = async (data: TeacherDto) => {

    const { name, surname, phone, directions } = data

    return prisma.teacher.create({
        data: {
            userId: data.userId!,
            name,
            surname,
            phone,
            directions: {
                connect: directions.map(id => {
                    return { id }
                })
            }
        },
        include: {
            directions: true
        }
    })
}

export const updateTeacher = async (id: number, data: TeacherDto) => {
    
    const { name, surname, phone, directions } = data

    return prisma.teacher.update({
        where: {
            id
        },
        data: {
            name,
            surname,
            phone,
            directions: {
                set: directions.map(direction => ({ id: direction }))
            }
        },
        include: {
            directions: true,
            groups: true
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
        },
        include: {
            directions: true,
            groups: true
        }
    })
}

export const allTeachersCount = async (organizationId: number, status: EntityStatus) => {
    return prisma.teacher.count({
        where: {
            user: {
                organizationId
            },
            status
        }
    })
}

export const isTeacherBelongsToOrganization = async (organizationId: number, teacherId: number) => {
    const teacher = await prisma.teacher.findFirst({
        where: {
            user: {
                organizationId
            },
            id: teacherId
        }
    })
    return teacher != null
}

export const recoverTeacher = async (teacherId: number) => {
    return await prisma.teacher.update({
        where: {
            id: teacherId
        },
        data: {
            status: 'active'
        }
    })
}