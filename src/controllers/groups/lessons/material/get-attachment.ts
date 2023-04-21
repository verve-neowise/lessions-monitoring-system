import { existsAttachment, getAttachment, getPath } from '@services/attachment.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const lessonId = +req.params.lesson
        const file = req.params.filename

        if (!existsAttachment(organizationId, lessonId, file)) {
            return res.status(404).json({
                message: 'Attachment not found'
            })
        }

        const path = getPath(organizationId, lessonId)
        

        res.sendFile(file, {
            root: path
        })
    }
    catch(err) {
        console.log(err);
        next(err)
    }
}