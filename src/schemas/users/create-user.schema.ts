import { array, object, schema, string } from "@verve-neowise/validius";

export default schema(object({
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