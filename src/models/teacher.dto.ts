import { Permission } from "@prisma/client"

export interface TeacherDto {
    userId?: number
    name: string
    surname: string
    phone: string
    directions: number[]
}


export interface TeacherResponse {
    id: number
    userId: number
    username: string
    name: string
    surname: string
    phone: string
    groups: {
        id: number
        name: string
        direction: {
            id: number
            name: string
        }
        students: number
    }[]
    directions: {
        id: number
        name: string
    }[]
    permissions: Permission[]
}