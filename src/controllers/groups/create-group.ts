import { GroupDto } from '@models/group.dto';
import { createGroup } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const dto: GroupDto = req.body

        const teacher = await createGroup(dto)

        res.json({
            message: "group created.",
            teacher
        })
    }
    catch(err) {
        next(err)
    }
}