import { number, object, schema, string } from "@verve-neowise/validius";

export const setAssessmentSchema = schema(object({
    entries: {
        comment: string({
            required: false
        }),
        score: number({
            required: true,
            min: 0
        })
    }
}))

export const createAssessmentSchema = schema(object({
    entries: {
        studentId: number({
            required: true,
            min: 0
        }),
        comment: string({
            required: false
        }),
        score: number({
            required: true,
            min: 0
        })
    }
}))