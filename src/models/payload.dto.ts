import { Permission } from "@prisma/client"

export type Payload = {
    userId: number,
    orgId: number,
    username: string,
    permissions: Permission[],
}