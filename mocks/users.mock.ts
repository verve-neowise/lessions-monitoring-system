import { Permission } from "@prisma/client"
import { createUser } from "@services/user.service"
import bcrypt from 'bcrypt'

export const mockUsers = async () => {

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync('1234', salt)

    await createUser("root", hashPassword, [
        Permission.groups, Permission.students, Permission.teachers, Permission.users
    ])

    await createUser("teacher", hashPassword, [
        Permission.students
    ])

    await createUser("student", hashPassword, [
        Permission.groups
    ])

    console.log('Complete create users');
}