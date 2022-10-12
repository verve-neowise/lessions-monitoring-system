import { getGroupTeacher } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id

        const group = await getGroupTeacher(id)

        if (!group) {
            return res.status(403).json({
                message: "Group not found: " + id
            })
        }
        
        res.json({
            message: `Group '${group.name}' teacher`,
            teacher: group.teacher
        })
    }
    catch(err) {
        next(err)
    }
}