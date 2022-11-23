import { array, object, schema, string } from "@verve-neowise/validius";

export const createUserSchema = schema(object({
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
        permissions: array({
            template: string({
                required: true,
                min: 0,
                max: 32
            })
        })
    }
}))

export const permissionsSchema = schema(object({
    required: true,
    entries: {
        permissions: array({
            template: string({
                required: true,
                min: 0,
                max: 32
            })
        })
    }
}))

export const updateUserSchema = schema(object({
    required: true,
    entries: {
        username: string({
            required: true,
            min: 3,
            max: 16
        }),
        password: string({
            required: true,
            min: 0,
            max: 32
        })
    }
}))