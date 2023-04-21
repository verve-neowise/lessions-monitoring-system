import { pathConfig } from '../configs'
import fs, { mkdirSync, rmSync } from 'fs'

import path from 'path'
import { mkdirsSync } from 'fs-extra'

export const createAttachmentsFolder = (organizationId: number, lessonId: number) => {
    mkdirsSync(getPath(organizationId, lessonId)) 
}

export const getAttachments = (organizationId: number, lessonId: number) => {
    return fs.readdirSync(getPath(organizationId, lessonId))
}

export const deleteAttachment = (organizationId: number, lessonId: number, filename: string) => {
    rmSync(path.join(getPath(organizationId, lessonId), filename))
}

export const getAttachment = (organizationId: number, lessonId: number, filename: string) => {
    return path.join(getPath(organizationId, lessonId), filename)
}

export const existsAttachment = (organizationId: number, lessonId: number, filename: string) => {
    return fs.existsSync(path.join(getPath(organizationId, lessonId), filename))
}

export function getPath(organizationId: number, lessonId: number) {
    console.log(pathConfig.attachmentPath);
    console.log(organizationId, lessonId);
    return path.join(pathConfig.attachmentPath, organizationId.toString(), lessonId.toString())
}