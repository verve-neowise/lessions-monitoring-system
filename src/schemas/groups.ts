import { number, object, schema, string } from "@verve-neowise/validius";

export const createGroupSchema = schema(object({
    required: true,
    entries: {
        name: string({
            required: true,
            min: 3
        }),
        directionId: number({
            required: true,
            min: 0
        }),
        months: number({
            required: true,
            min: 1
        })
    }
}))
