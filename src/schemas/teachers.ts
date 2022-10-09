import { object, schema, string, number } from "@verve-neowise/validius";

export const createTeacherSchema = schema(object({
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
        surname: string({
            required: true,
            min: 3
        }),
        birthday: string({
            required: true,
            min: 3
        }),
        phone: string({
            required: true,
            min: 3
        })
    }
}))


export const updateTeacherSchema = schema(object({
    required: true,
    entries: {
        name: string({
            required: true,
            min: 3
        }),
        surname: string({
            required: true,
            min: 3
        }),
        birthday: string({
            required: true,
            min: 3
        }),
        phone: string({
            required: true,
            min: 3
        })
    }
}))