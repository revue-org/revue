import { z } from 'zod'

export const userLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const userLogoutSchema = z.object({
  username: z.string(),
})
