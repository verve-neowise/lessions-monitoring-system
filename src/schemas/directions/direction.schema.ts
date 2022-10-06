import { object, schema, string } from "@verve-neowise/validius";

export default schema(object({
    required: true,
    entries: {
        name: string({
            required: true,
            min: 4
        })
    }
}))