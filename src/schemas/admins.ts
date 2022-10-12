import { object, schema, string, number, array } from "@verve-neowise/validius";

export const adminSchema = schema(object({
    required: true,
    entries: {
        username: string({
            required: true,
            min: 3,
            max: 16
        }),
        password: string({
            required: true,
            min: 3,
            max: 32
        }),
        name: string({
            required: true,
            min: 3
        }),
        permissions: array({
            required: true,
            template: string({
                required: true,
                min: 2
            })
        })
    }
}))