import { GroupDto, GroupResponse } from '@models/group.dto';
import { findDirectionById } from '@services/direction.service';
import { createGroup, isGroupWithNameExists } from '@services/group.service';
import { findTeacherById } from '@services/teacher.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId 

        const dto: GroupDto = req.body

        const find = await isGroupWithNameExists(organizationId, dto.name)

        if (find) {
            return res.status(400).json({
                message: 'Group with name ' + find + ' already exists'
            })
        }

        const direction = await findDirectionById(organizationId, dto.directionId)

        if (!direction) {
            return res.status(400).json({
                message: `Direction with id ${dto.directionId} not found.`
            })
        }

        if (direction?.status != 'active') {
            return res.status(400).json({
                message: `Cant create group with deleted or deactivated direction`
            })
        }

        if (dto.teacherId) {
            const teacher = await findTeacherById(organizationId, dto.teacherId!!)

            if (!teacher) {
                return res.status(404).json({
                    message: `Teacher with id ${dto.teacherId} not found` 
                })
            }

            if (teacher.status !== 'active') {
                return res.status(404).json({
                    message: `Cant set deleted or deactivated teacher to group` 
                })
            }
        }

        const group = await createGroup(organizationId, dto)

        const response: GroupResponse =  {
            id: group.id,
            name: group.name,
            months: group.months,
            direction: {
                id: group.direction.id,
                name: group.direction.name,
                status: group.direction.status
            },
            teacher: group.teacher,
            status: group.status
        }

        res.json({
            message: "group created.",
            group: response
        })
    }
    catch(err) {
        next(err)
    }
}