import { GroupDto } from '@models/index'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allGroups = async (organizationId: number) => {
    return prisma.group.findMany({
        where: {
            organizationId,
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

export const findGroupById = async (organizationId: number, id: number) => {
    return prisma.group.findFirst({
        where: {
            id,
            organizationId
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

export const getGroupStudents = (organizationId: number, id: number) => {
    return prisma.group.findFirst({
        where: {
            id,
            organizationId
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

export const isGroupExists = async (organizationId: number, id: number) => {
    const group = await findGroupById(organizationId, id)
    return group !== null
}

export const createGroup = async (organizationId: number, data: GroupDto) => {
    const { name, months, directionId } = data
    return prisma.group.create({
        data: {
            name,
            months,
            direction: {
                connect: {
                    id: directionId
                }
            },
            organization: {
                connect: {
                    id: organizationId
                }
            }
        },
        select: {
            id: true,
            name: true,
            direction: true,
            months: true,
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

export const allGroupsCount = async (organizationId: number) => {
    return prisma.group.count({
        where: {
            organizationId,
            status: 'active'
        }
    })
}