import { createOrganization } from '../src/services/organization.service'
import { OrganizationDto } from '../src/models/organization.dto'

const orgs = [
    "DATA",
    "Faveo"
]


export default async () => {
    const org = await createOrganization({ name: "DATA" })
    console.log('Organization created: ' + org.id);
    return org.id
}