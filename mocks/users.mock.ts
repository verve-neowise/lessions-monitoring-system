import { Permission } from "@prisma/client"

import { createUser } from '@services/user.service'

export const mockUsers = async () => {

    const password = "1234"

    await createUser("teacher", password, [
        Permission.students
    ])

    await createUser("teacher", password, [
        Permission.students
    ])

    await createUser("student", password, [
        Permission.groups
    ])

    console.log('Complete create users');
}