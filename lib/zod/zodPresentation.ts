import {z} from "zod";

const zodPresentation = z.object({
    id: z.union([z.string(), z.number()]).nullable(),
    title: z.string(),
    creator_nickname: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
})

const zodPresentationResponse = z.object({
    presentation: z.array(zodPresentation),
});

export type zodPresentation = z.infer<typeof zodPresentation>;
export type zodPresentationResponse = z.infer<typeof zodPresentationResponse>;