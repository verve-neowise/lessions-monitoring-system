import { array, object, schema, string } from "@verve-neowise/validius";

export default schema(object({
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