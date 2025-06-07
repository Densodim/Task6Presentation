import {z} from "zod";

const zodSlide = z.object({
    id: z.string().nullable(),
    presentation_id: z.string().nullable(),
    order: z.string().nullable(),
    background: z.string().optional()
})

export type zodSlide = z.infer<typeof zodSlide>