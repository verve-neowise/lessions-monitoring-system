import { mainPage } from '@controllers/main';
import { Router } from 'express';

const router = Router({ mergeParams: true })

router.get('/', mainPage)

export default router