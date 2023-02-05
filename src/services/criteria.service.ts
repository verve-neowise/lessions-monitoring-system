import { CriteriaDto } from '@models/criteria.dto'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allCriterias = async (organizationId: number) => {
    return prisma.criteria.findMany({
        where: {
            organizationId,
            status: 'active'
        },
        include: {
            scroings: true
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

export const isCriteriaExists = async (organizationId: number, id: number) => {
    const criteria = await findCriteriaById(organizationId, id)
    return criteria !== null
}

export const createCriteria = async (organizationId: number, data: CriteriaDto) => {
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
            organization: {
                connect: {
                    id: organizationId
                }
            }
        },
        include: {
            scroings: true
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