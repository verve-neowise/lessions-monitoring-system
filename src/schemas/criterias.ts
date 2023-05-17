import { schema, object, string, number, array } from "@verve-neowise/validius";

export const criteriaSchema = schema(object({
    entries: {
        name: string({
            required: true,
            min: 1
        }),
        maximum: number({
            required: true,
            min: 0
        }),
        scorings: array({
            required: true,
            template: object({
                entries: {
                    value: number({ 
                        required: true,
                        min: 0
                    }),
                    description: string({
                        required: true
                    })
                } 
            })
        })
    }
}))