import { Permission } from "@prisma/client"

export interface AdminDto {
    userId?: number,
    name: string
}

export interface UpdateAdminDto {
    name: string
    username: string
    password: string
    permissions: Permission
}