import { z } from "zod"

export const imageRowSchema = z.object({
	id: z.string(),
	author: z.string(),
	width: z.number().positive(),
	height: z.number().positive(),
	url: z.string().url(),
	download_url: z.string().url(),
})

export const imageListSchema = z.array(imageRowSchema)

export type ImageRow = z.infer<typeof imageRowSchema>
