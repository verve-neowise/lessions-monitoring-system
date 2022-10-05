import { Router } from 'express';
const router = Router()

router.get('/test', (req, res) => {
    res.send('api v1')
})

export default router