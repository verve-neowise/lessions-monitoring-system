import { getPath } from '@services/attachment.service';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs-extra'
import path from 'path'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = req.params.orgId
        const lessonId = req.params.lesson
        const file = req.file

        if (!file) {
            return res.status(400).json({
                message: 'Attachment file not provided'
            })
        }

        const source = file.path
        const dest =  path.join(getPath(+organizationId, +lessonId), file.filename)

        fs.moveSync(source, dest, {
            overwrite: true
        })

        res.status(200).json({
            message: 'File success uploaded',
            filename: file.filename
        })
    }
    catch(err) {
        next(err)
    }
}