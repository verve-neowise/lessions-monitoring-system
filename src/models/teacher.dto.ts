import { Permission } from "@prisma/client"

export interface TeacherDto {
    userId?: number
    name: string
    surname: string
    phone: string
    directions: number[]
}

export type TeacherGroup = {
    id: number
    name: string
    direction: {
        id: number
        name: string
    }
    students: number
}

export interface TeacherResponse {
    id: number
    userId: number
    username: string
    name: string
    surname: string
    phone: string
    groups: (TeacherGroup | { id: number, name: string })[]
    directions: {
        id: number
        name: string
    }[]
    permissions: Permission[]
}