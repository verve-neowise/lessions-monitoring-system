import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const allAssessments = async () => {
    return prisma.assessment.findMany()
}

export const findAssessmentById = async (id: number) => {
    return prisma.assessment.findUnique({
        where: {
            id
        }
    })
}

export const isAssessmentExists = async (id: number) => {
    const assessment = await findAssessmentById(id)
    return assessment !== null
}

export const createAssessment = async (data: any) => {
    return prisma.assessment.create({
        data: data
    })
}

export const updateAssessment = async (id: number, data: any) => {
    return prisma.assessment.update({
        where: {
            id
        },
        data: data
    })
}

export const deleteAssessment = async (id: number) => {
    return prisma.assessment.delete({
        where: {
            id
        }
    })
}