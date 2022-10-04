import { array, number, object, schema, string } from '@verve-neowise/validius'

export default schema(
    object({
        required: true,
        entries: {
            username: string({
                required: true,
                min: 5,
                max: 16
            }),
            password: string({
                required: true,
                min: 8,
                max: 32
            })
        }
    })
)