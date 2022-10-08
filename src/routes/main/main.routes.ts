import { mainPage } from '@controllers/main';
import { Router } from 'express';

const router = Router()

router.get('/', mainPage)

export default router