import { z } from 'zod'

export const userInsertionSchema = z.object({
  username: z.string(),
  password: z.string(),
  permissions: z.array(z.string())
})

export const userPermissionsSchema = z.object({
  permissions: z.array(z.string())
})

