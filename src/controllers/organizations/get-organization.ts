import { findOrganizationById } from "@services/organization.service"
import { NextFunction, Request, Response } from "express"

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizationId = +req.params.id

        const organization = await findOrganizationById(organizationId)

        if (!organization) {
            return res.status(404).json({
                message: 'Organization not found'
            })
        }

        res.status(200).json({
            message: 'Retrive organization',
            organization
        })
    }
    catch(err) {
        next(err)
    }
}