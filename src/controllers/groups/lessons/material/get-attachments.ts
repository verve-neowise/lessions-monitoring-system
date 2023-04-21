import { getAttachments } from '@services/attachment.service';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.orgId
        const lessonId = +req.params.lesson
        const attachments = getAttachments(organizationId, lessonId)

        res.json({
            message: 'retrive lesson attachments',
            attachments
        })
    }
    catch(err) {
        next(err)
    }
}