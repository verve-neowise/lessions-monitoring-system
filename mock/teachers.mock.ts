import { createTeacher } from '../src/services/teacher.service'
import { createUser } from '../src/services/user.service'
import { UserDto } from '../src/models/user.dto'
import { TeacherDto } from '../src/models/teacher.dto'
import { Permission } from '@prisma/client'

const teachers = [
    {
        username: "jalol",
        password: "1234",
        permissions: [Permission.teacher] 
    }
]

export default async (organizationId: number) => {

    const ids: number[] = []

    for(let data of teachers) {
        const dto: UserDto = {
            username: data.username,
            password: data.password,
            permissions: data.permissions
        }
        const user = await createUser(organizationId, dto)

        // const adminDto: TeacherDto = {
        //     name: data.username,
        //     userId: user.id
        // } 

        // const admin = await createAdmin(adminDto)

        // ids.push(admin.id)
    }

    return ids
}