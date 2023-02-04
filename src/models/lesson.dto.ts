export interface LessonDto {
    title: string
    date: string
}

export interface LessonResponse {
    id: number
    title: string
    date: Date
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