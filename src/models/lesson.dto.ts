export interface LessonDto {
    title: string
    date: string
    criteria: number
}

export interface LessonResponse {
    id: number
    title: string
    date: Date
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