import { Router } from 'express';

import { permissions } from '@middlewares/index';
import { 
    allOrganizations, 
    createOrganization, 
    deleteOrganization, 
    updateOrganization 
} from '@controllers/organizations';

import { body } from '@verve-neowise/express-validius';
import { organizationSchema, organizationUpdateSchema } from '@schemas/organizations';

const router = Router({ mergeParams: true })

router.get('/', permissions('surpervisor'), allOrganizations)
router.post('/', permissions('surpervisor'), body(organizationSchema), createOrganization)
router.put('/:id', permissions('surpervisor'), body(organizationUpdateSchema), updateOrganization)
router.delete('/:id', permissions('surpervisor'), deleteOrganization)

export default router