import { z } from 'zod'
import { MeasureType } from '@common/domain/core/MeasureType.js'
import { ContactType } from '@common/domain/core/ContactType.js'
import { MeasureUnit } from '@common/domain/core/MeasureUnit.js'
import { ObjectClass } from '@common/domain/core/ObjectClass.js'

export const rangeRuleSchema = z.object({
  description: z.string(),
  activeOn: z.string(),
  contacts: z.array(
    z.object({
      type: z.nativeEnum(ContactType),
      value: z.string().min(5)
    })
  ),
  author: z.string(),
  validityStart: z.date(),
  validityEnd: z.date(),
  rule: z.object({
    measure: z.object({
      type: z.nativeEnum(MeasureType),
      unit: z.nativeEnum(MeasureUnit)
    }),
    minValue: z.number(),
    maxValue: z.number()
  })
})

export const intrusionRuleSchema = z.object({
  description: z.string(),
  activeOn: z.string(),
  contacts: z.array(
    z.object({
      contactType: z.nativeEnum(ContactType),
      value: z.string().min(5)
    })
  ),
  author: z.string(),
  validityStart: z.date(),
  validityEnd: z.date(),
  objectClass: z.nativeEnum(ObjectClass)
})
