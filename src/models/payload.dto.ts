import { Permission, Role } from "@prisma/client"

export type Payload = {
    userId: number,
    username: string,
    permissions: Permission[],
    role: Role
}