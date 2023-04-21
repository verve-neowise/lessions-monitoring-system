import { LessonType } from "@prisma/client";
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
        }),
        type: string({
            match: [LessonType.exam, LessonType.lesson, LessonType.practice]
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