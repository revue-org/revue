import { z } from 'zod'

export const userMessageSchema = z.object({
  username: z.string(),
  password: z.string(),
  permissions: z.array(z.string())
})
