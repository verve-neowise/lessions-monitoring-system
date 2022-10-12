import { findAdminByUserId } from './../../services/admin.service';
import { Role } from '@prisma/client';
import { findStudentByUserId } from '@services/student.service';
import { findTeacherByUserId } from '@services/teacher.service';
import { findUserById } from '@services/user.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = res.locals.payload

        const user = await findUserById(userId)

        const { username, role, permissions } = user!

        if (user?.role == Role.student) {
            const profile = await findStudentByUserId(userId)

            if (!profile) {
                return res.status(400).json({
                    message: `User ${user.username} do not have student profile`
                })
            }

            const { name, surname, phone, birthday } = profile!

            res.json({
                message: "User profile",
                profile: {
                    username,
                    role,
                    permissions,
                    name,
                    surname,
                    phone,
                    birthday
                }
            })
        }
        else if (user?.role == 'teacher') {
            
            const profile = await findTeacherByUserId(userId)

            if (!profile) {
                return res.status(400).json({
                    message: `User ${user.username} do not have teacher profile`
                })
            }

            const { name, surname, phone, birthday } = profile!

            res.json({
                message: "User profile",
                profile: {
                    username,
                    role,
                    permissions,
                    name,
                    surname,
                    phone,
                    birthday
                }
            })
        }
        else if (user?.role == 'admin') {
            
            const profile = await findAdminByUserId(userId)

            if (!profile) {
                return res.status(400).json({
                    message: `User ${user.username} do not have admin profile`
                })
            }

            const { name } = profile!

            res.json({
                message: "User profile",
                profile: {
                    username,
                    role,
                    permissions,
                    name
                }
            })
        }
    }
    catch(err) {
        next(err)
    }
}