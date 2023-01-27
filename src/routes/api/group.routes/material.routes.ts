import { addAttachment, getAttachments, removeAttachment, updateMaterial } from "@controllers/groups/lessons/material"
import permissions from "@middlewares/permissions"
import { Router } from "express"

const router = Router()

// /groups/1/lessons/3/material
router.put('/material', permissions('teacher'), updateMaterial)
router.get('/attachments', permissions('teacher', 'admin', 'student'), getAttachments)
router.post('/attachments', permissions('teacher'), addAttachment)
router.get('/attachment/:attachment', permissions('teacher'), removeAttachment)

export default router