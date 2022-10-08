import { array, number, object, schema, string } from '@verve-neowise/validius'

export const loginSchema = schema(
    object({
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
            })
        }
    })
)

export const registerSchema = schema(
    object({
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
            })
        }
    })
)