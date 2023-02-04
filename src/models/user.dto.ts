import { Permission } from "@prisma/client";

export interface UserDto {
    username: string, 
    password: string,
    permissions: Permission[]
}