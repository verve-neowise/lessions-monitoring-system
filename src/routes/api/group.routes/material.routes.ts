import { addAttachment, getAttachments, removeAttachment, updateMaterial, getAttachment } from "@controllers/groups/lessons/material"
import { upload } from "@middlewares/fileupload"
import permissions from "@middlewares/permissions"
import { materialSchema } from "@schemas/lesson"
import { body } from "@verve-neowise/express-validius"
import { Router } from "express"

const router = Router({ mergeParams: true })

router.put('/material', permissions('teacher'), body(materialSchema), updateMaterial)
router.get('/material', permissions('teacher', 'admin', 'student'), body(materialSchema), updateMaterial)

router.get('/attachments', permissions('teacher', 'admin', 'student'), getAttachments)
router.post('/attachments', permissions('teacher'), upload.single('file'), addAttachment)

router.get('/attachments/:attachment', permissions('teacher', 'admin', 'student'), getAttachment)
router.delete('/attachments/:attachment', permissions('teacher'), removeAttachment)

export default router