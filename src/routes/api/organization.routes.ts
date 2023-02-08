import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { 
    allOrganizations, 
    createOrganization, 
    deleteOrganization, 
    getOrganization, 
    recoverOrganization, 
    updateOrganization 
} from '@controllers/organizations';

import { body } from '@verve-neowise/express-validius';
import { organizationSchema, organizationUpdateSchema } from '@schemas/organizations';

const router = Router({ mergeParams: true })

router.get('/', permissions('surpervisor'), allOrganizations)
router.get('/:id', permissions('surpervisor'), getOrganization)
router.post('/', permissions('surpervisor'), body(organizationSchema), createOrganization)
router.put('/:id', permissions('surpervisor'), body(organizationUpdateSchema), updateOrganization)
router.delete('/:id', permissions('surpervisor'), deleteOrganization)

router.patch('/:id/recover', permissions('surpervisor'), recoverOrganization)

export default router