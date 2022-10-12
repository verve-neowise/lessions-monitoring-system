import { GroupDto } from '@models/group.dto';
import { createGroup } from '@services/group.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {

        const dto: GroupDto = req.body

        const group = await createGroup(dto)

        res.json({
            message: "group created.",
            group
        })
    }
    catch(err) {
        next(err)
    }
}