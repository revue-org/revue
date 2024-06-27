import { z } from 'zod'

export const userInsertSchema = z.object({
  username: z.string(),
  password: z.string(),
  permissions: z.array(z.string())
})

export const userPermissionsSchema = z.object({
  permissions: z.array(z.string())
})

