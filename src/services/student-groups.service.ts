import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const getStudentGroups = async (id: number) => {
    return prisma.student.findUnique({
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
                    },
                    status: true
                },
                where: {
                    status: 'active'
                }
            }
        }
    })
}
