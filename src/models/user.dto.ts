import { Permission, Role } from "@prisma/client";

export interface UserDto {
    username: string, 
    password: string,
    role: Role, 
    permissions: Permission[]
}