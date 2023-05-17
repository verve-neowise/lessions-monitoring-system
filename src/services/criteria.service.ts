import { CriteriaDto } from '@models/criteria.dto'
import { EntityStatus, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allCriterias = async (organizationId: number, status: EntityStatus) => {
    return prisma.criteria.findMany({
        where: {
            organizationId,
            status: status
        },
        include: {
            scroings: true,
            teacher: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    status: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const findCriteriaById = async (organizationId: number, id: number) => {
    return prisma.criteria.findFirst({
        where: {
            id,
            organizationId
        }
    })
}


export const findTeacherCriterias = async (organizationId: number, teacherId: number) => {
    return prisma.criteria.findMany({
        where: {
            OR: [
                {
                    teacherId,
                    organizationId
                },
                {
                    teacherId: -1,
                    organizationId
                }
            ]            
        },
        include: {
            scroings: true,
            teacher: {
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    status: true
                }
            }
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const isCriteriaExists = async (organizationId: number, id: number) => {
    const criteria = await findCriteriaById(organizationId, id)
    return criteria !== null
}

export const createCriteria = async (organizationId: number, teacherId: number, data: CriteriaDto) => {
    return prisma.criteria.create({
        data: {
            maximum: data.maximum,
            scroings: {
                createMany: {
                    data: data.scorings.map(scoring => ({
                        value: scoring.value,
                        description: scoring.description
                    }))
                }
            },
            teacher: {
                connect: {
                    id: teacherId
                }
            },
            organization: {
                connect: {
                    id: organizationId
                }
            }
        },
        include: {
            scroings: true,
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

export const updateCriteria = async (id: number, data: CriteriaDto) => {
    return prisma.criteria.update({
        where: {
            id
        },
        data: {
            maximum: data.maximum,
            scroings: {
                deleteMany: [],
                createMany: {
                    data: data.scorings.map(scoring => ({
                        value: scoring.value,
                        description: scoring.description
                    }))
                }
            }
        },
        include: {
            scroings: true
        }
    })
}

export const deleteCriteria = async (id: number) => {
    return prisma.criteria.update({
        where: {
            id
        },
        data: {
            status: 'deleted'
        },
        include: {
            scroings: true
        }
    })
}

export const recoverCriteria = async (criteriaId: number) => {
    return await prisma.criteria.update({
        where: {
            id: criteriaId
        },
        data: {
            status: 'active'
        }
    })
}