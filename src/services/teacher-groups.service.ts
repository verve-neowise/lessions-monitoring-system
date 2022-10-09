import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getTeacherGroups = async (id: number) => {
    return prisma.teacher.findUnique({
        where: {
            id
        },
        select: {
            groups: {
                select: {
                    id: true,
                    direction: {
                        select: {
                            name: true
                        }
                    },
                    name: true,
                    months: true,
                    students: {
                        select: {
                            _count: true
                        }
                    }
                },
                where: {
                    status: 'active'
                }
            }
        }
    })
}
