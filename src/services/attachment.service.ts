import { pathConfig } from '../configs'
import fs, { mkdirSync, rmSync } from 'fs'

import path from 'path'

export const createAttachmentsFolder = (lessonId: number) => {
    mkdirSync(path.join(pathConfig.attachmentPath, lessonId.toString())) 
}

export const getAttachments = (lessonId: number) => {
    return fs.readdirSync(getPath(lessonId))
}

export const deleteAttachment = (lessonId: number, filename: string) => {
    rmSync(path.join(getPath(lessonId), filename))
}

export const createAttachment = (lessonId: number, filename: string) => {
    const folder = getPath(lessonId)
}

function getPath(lessonId: number) {
    return path.join(pathConfig.attachmentPath, lessonId.toString())
}