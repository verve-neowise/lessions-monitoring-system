import { number, object, schema, string } from "@verve-neowise/validius";

export const lessonSchema = schema(object({
    entries: {
        title: string({
            required: true
        }),
        date: string({
            required: true
        }),
        criteria: number({
            required: true
        })

    }
}))

export const materialSchema = schema(object({
    entries: {
        content: string({
            required: true
        })
    }
}))