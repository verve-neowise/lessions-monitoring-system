import { GroupDto } from '@models/index'
import { EntityStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allGroups = async (organizationId: number, status: EntityStatus) => {
    return prisma.group.findMany({
        where: {
            organizationId,
            status
        },
        select: {
            id: true,
            name: true,
            months: true,
            direction: {
                select: {
                    id: true,
                    name: true,
                    status: true
                }
            },
            teacher: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    status: true
                }
            },
            status: true
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const findGroupByIdWithDetails = async (organizationId: number, id: number) => {
    return prisma.group.findFirst({
        where: {
            id,
            organizationId
        },
        include: {
            direction: {
                select: {
                    id: true,
                    name: true,
                    status: true
                }
            },
            teacher: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    status: true
                }
            }
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

export const getGroupTeacher = async (organizationId: number, id: number) => {
    return prisma.group.findFirst({
        where: {
            organizationId,
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

export const addManyStudentsToGroup = (id: number, studentIds: number[]) => {
    return prisma.group.update({
        where: {
            id
        },
        data: {
            students: {
                connect: studentIds.map(id => ({
                    id
                }))
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

export const findGroupWithName = async (organizationId: number, name: string) => {
    return await prisma.group.findFirst({
        where: {
            organizationId,
            name: name.trim().toLowerCase()
        }
    })
}

export const isGroupWithNameExists = async (organizationId: number, name: string) => {
    const group = await prisma.group.findFirst({
        where: {
            organizationId,
            name: name.trim().toLowerCase()
        }
    })
    return group !== null
}

export const createGroup = async (organizationId: number, data: GroupDto) => {
    const { name, months, directionId } = data
    return prisma.group.create({
        data: {
            name: name.toLowerCase(),
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
            status: true,
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
            name: name.trim().toLowerCase(),
            months,
            directionId
        },
        include: {
            direction: {
                select: {
                    id: true,
                    name: true,
                    status: true
                }
            },
            teacher: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    status: true
                }
            }
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

export const allGroupsCount = async (organizationId: number, status: EntityStatus) => {
    return prisma.group.count({
        where: {
            organizationId,
            status
        }
    })
}

export const recoverGroup = async (groupId: number) => {
    return await prisma.group.update({
        where: {
            id: groupId
        },
        data: {
            status: 'active'
        }
    })
}