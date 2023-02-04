import { deleteAttachment } from '@services/attachment.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const lessonId = +req.params.lesson
        const file = req.params.filename

        deleteAttachment(organizationId, lessonId, file)

        res.json({
            message: 'Attachment deleted'
        })
    }
    catch(err) {
        next(err)
    }
}