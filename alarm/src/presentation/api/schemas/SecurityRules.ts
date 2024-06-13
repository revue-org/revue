import { z } from "zod";
// import { ObjectClass } from '@/domain/core/ObjectClass'

export const rangeRuleSchema = z.object({
  description: z.string(),
  deviceId: z.string(),
  contacts: z.array(z.object({
    contactType: z.enum(['sms', 'email']),
    value: z.string().min(5)
  })),
  author: z.string(),
  validityStart: z.date(),
  validityEnd: z.date(),
  rule: z.object({
    measureType: z.enum(['temperature', 'humidity', 'pressure']),
    minValue: z.number(),
    maxValue: z.number()
  })
})

export const intrusionRuleSchema = z.object({
  description: z.string(),
  deviceId: z.string(),
  contacts: z.array(z.object({
    contactType: z.enum(['sms', 'email']),
    value: z.string().min(5)
  })),
  author: z.string(),
  validityStart: z.date(),
  validityEnd: z.date(),
  objectClass: z.enum(['person', 'animal', 'vehicle']) //Object.keys(ObjectClass)
})
