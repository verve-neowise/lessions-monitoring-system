import { GroupDto } from '@models/index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allGroups = async () => {
    return prisma.group.findMany({
        where: {
            status: 'active'
        },
        select: {
            id: true,
            name: true,
            months: true,
            direction: {
                select: {
                    id: true,
                    name: true
                }
            },
            teacher: true,
            status: true
        }
    })
}

export const findGroupById = async (id: number) => {
    return prisma.group.findUnique({
        where: {
            id
        }
    })
}

export const getGroupTeacher = async (id: number) => {
    return prisma.group.findUnique({
        where: {
            id
        },
        include: {
            teacher: true
        }
    })
}

export const changeGroupTeacher = async (id: number, teacherId: number) => {
    return prisma.group.update({
        where: {
            id
        },
        data: {
            teacher: {
                connect: {
                    id: teacherId
                }
            }
        },
        select: {
            name: true,
            teacher: {
                select: {
                    id: true,
                    name: true,
                    surname: true
                }
            }
        }
    })
}

export const removeStudentFromGroup = (id: number, studentId: number) => {
    return prisma.group.update({
        where: {
            id
        },
        data: {
            students: {
                disconnect: {
                    id: studentId
                }
            }
        }
    })
}

export const addStudentToGroup = (id: number, studentId: number) => {
    return prisma.group.update({
        where: {
            id
        },
        data: {
            students: {
                connect: {
                    id: studentId
                }
            }
        }
    })
}

export const getGroupStudents = (id: number) => {
    return prisma.group.findUnique({
        where: {
            id
        },
        select: {
            name: true,
            students: {
                where: {
                    status: 'active'
                }
            }
        }
    })
}

export const isGroupExists = async (id: number) => {
    const group = await findGroupById(id)
    return group !== null
}

export const createGroup = async (data: GroupDto) => {
    const { name, months, directionId } = data
    return prisma.group.create({
        data: {
            name,
            months,
            direction: {
                connect: {
                    id: directionId
                }
            }
        }
    })
}

export const updateGroup = async (id: number, data: GroupDto) => {

    const { name, months, directionId } = data

    return prisma.group.update({
        where: {
            id
        },
        data: {
            name,
            months,
            directionId
        }
    })
}

export const deleteGroup = async (id: number) => {
    return prisma.group.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        }
    })

}

export const allGroupsCount = async () => {
    return prisma.group.aggregate({
        _count: { 
            id: true
        }
    })
}