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