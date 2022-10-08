import { object, schema, string } from "@verve-neowise/validius";

export const directionSchema = schema(object({
    required: true,
    entries: {
        name: string({
            required: true,
            min: 4
        })
    }
}))