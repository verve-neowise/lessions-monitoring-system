import { createAdmin } from '../src/services/admin.service'
import { createUser } from '../src/services/user.service'
import { UserDto } from '../src/models/user.dto'
import { AdminDto } from '../src/models/admin.dto'
import { Permission } from '@prisma/client'

const admins = [
    {
        username: "root",
        password: "1234",
        permissions: [Permission.admin] 
    }
]

export default async (organizationId: number) => {

    const ids: number[] = []

    for(let data of admins) {
        const dto: UserDto = {
            username: data.username,
            password: data.password,
            permissions: data.permissions
        }
        const user = await createUser(organizationId, dto)

        const adminDto: AdminDto = {
            name: data.username,
            userId: user.id
        } 

        const admin = await createAdmin(adminDto)

        console.log('Admin created: ' + admin.id);

        ids.push(admin.id)
    }

    return ids
}