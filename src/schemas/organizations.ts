import { object, schema, string, number, array } from "@verve-neowise/validius";

export const organizationSchema = schema(object({
    required: true,
    entries: {
        name: string({
            required: true,
            min: 3
        }),
    }
}))

export const organizationUpdateSchema = schema(object({
    required: true,
    entries: {
        name: string({
            required: true,
            min: 3
        }),
    }
}))