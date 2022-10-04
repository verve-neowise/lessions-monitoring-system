import { Permission } from "@prisma/client"

export type Payload = {
    userId: number,
    username: string,
    permissions: Permission[]
}