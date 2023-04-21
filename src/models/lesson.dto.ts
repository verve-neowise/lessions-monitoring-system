import { LessonType } from "@prisma/client"

export interface LessonDto {
    title: string
    date: string
    criteria: number
    type: LessonType
}

export interface LessonResponse {
    id: number
    title: string
    date: Date
    type: LessonType
    criteria: {
        maximum: number
    },
    material?: {
        content: string
    }
}

export interface MaterialDto {
    content: string
}

export interface MaterialResponse {
    content: string
}