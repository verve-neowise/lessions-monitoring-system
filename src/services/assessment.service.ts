import { AssessmentDto } from "@models/assessment.dto"
import { PrismaClient } from "@prisma/client"

const client = new PrismaClient()

export const createAssessments = (dtos: AssessmentDto[]) => {
    return client.assessment.createMany({
        data: dtos.map(dto => ({
            lessonId: dto.lessonId,
            studentId: dto.studentId,
            groupId: dto.groupId,
            comment: dto.comment,
            score: dto.score
        }))
    })
}

export const updateAssessment = (assessmentId: number, dto: { score: number, comment: string }) => {
    return client.assessment.update({
        where: {
            id: assessmentId,
        },
        data: {
            score: dto.score,
            comment: dto.comment
        }
    })
}

export const getAssessmentsByStudent = (studentId: number) => {
    return client.assessment.findMany({
        where: {
            studentId
        },
        include: {
            lesson: true
        }
    })
}

export const getAssessmentsByLesson = (lessonId: number) => {
    return client.assessment.findMany({
        where: {
            lessonId
        },
        include: {
            student: true
        }
    })
}

export const getAssessmentsByGroup = (groupId: number) => {
    return client.assessment.findMany({
        where: {
            groupId
        },
        include: {
            student: true,
            lesson: true,
        }
    })
}