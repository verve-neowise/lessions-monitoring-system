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

export const createAssessment = (dto: AssessmentDto) => {
    return client.assessment.create({
        data: {
            lessonId: dto.lessonId,
            studentId: dto.studentId,
            groupId: dto.groupId,
            comment: dto.comment,
            score: dto.score
        }
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
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const getAssessmentsByGroupStudent = (groupId: number, studentId: number) => {
    return client.assessment.findMany({
        where: {
            studentId,
            groupId
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const getAssessmentsByLesson = (lessonId: number) => {
    return client.assessment.findMany({
        where: {
            lessonId
        },
        select: {
            score: true,
            comment: true,
            studentId: true
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const getAssessmentsByGroup = (groupId: number) => {
    return client.assessment.findMany({
        where: {
            groupId
        },
        orderBy: {
            id: 'asc'
        }
    })
}

export const isAssessmentExists = async (assessmentId: number) => {
    const assessment = await client.assessment.findUnique({
        where: {
            id: assessmentId
        }
    })
    return assessment != null
}

export const isStudentAssessmentExists = async (lessonId: number, studentId: number) => {
    const assessment = await client.assessment.findFirst({
        where: {
            lessonId,
            studentId
        }
    })
    return assessment != null
}