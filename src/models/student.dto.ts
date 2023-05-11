import { Permission } from "@prisma/client"

export interface StudentDto {
    userId?: number,
    name: string,
    surname: string,
    birthday: Date,
    phone: string
}

export interface StudentResponse {
    id: number
    userId: number,
    username: string,
    name: string,
    surname: string,
    phone: string,
    groups: {
        id: number,
        name: string
    }[],
    permissions: Permission[]
}