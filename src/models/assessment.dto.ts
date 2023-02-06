export interface AssessmentDto {
    groupId: number
    lessonId: number
    studentId: number
    comment: string
    score: number
}

export interface CreateAssessmentDto {
    studentId: number
    comment: string
    score: number
}

export interface SetAssessmentDto {
    comment: string
    score: number
}