import { z, ZodType } from 'zod'
import { MeasureType } from '@common/domain/core/MeasureType.js'
import { ContactType } from '@common/domain/core/ContactType.js'
import { MeasureUnit } from '@common/domain/core/MeasureUnit.js'
import { ObjectClass } from '@common/domain/core/ObjectClass.js'
import { Contact } from '@common/domain/core'

export type RangeRuleInsertion = {
  description: string
  activeOn: string
  contacts: Contact[]
  author: string
  validityStart: Date
  validityEnd: Date
  rule: {
    measure: {
      type: MeasureType
      unit: MeasureUnit
    }
    minValue: number
    maxValue: number
  }
}

export type IntrusionRuleInsertion = {
  description: string
  activeOn: string
  contacts: Contact[]
  author: string
  validityStart: Date
  validityEnd: Date
  objectClass: ObjectClass
}

export const rangeRuleInsertionSchema: ZodType<RangeRuleInsertion> = z.object({
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

export const intrusionRuleInsertionSchema: ZodType<IntrusionRuleInsertion> = z.object({
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
  objectClass: z.nativeEnum(ObjectClass)
})

export type RangeRuleUpdate = {
  description: string
  min: number
  max: number
  validityStart: Date
  validityEnd: Date
  contacts: Contact[]
}

export type IntrusionRuleUpdate = {
  description: string
  objectClass: ObjectClass
  validityStart: Date
  validityEnd: Date
  contacts: Contact[]
}

export const rangeRuleUpdateSchema: ZodType<RangeRuleUpdate> = z.object({
  description: z.string(),
  min: z.number(),
  max: z.number(),
  validityStart: z.date(),
  validityEnd: z.date(),
  contacts: z.array(
    z.object({
      type: z.nativeEnum(ContactType),
      value: z.string().min(5)
    })
  )
})

export const intrusionRuleUpdateSchema: ZodType<IntrusionRuleUpdate> = z.object({
  description: z.string(),
  objectClass: z.nativeEnum(ObjectClass),
  validityStart: z.date(),
  validityEnd: z.date(),
  contacts: z.array(
    z.object({
      type: z.nativeEnum(ContactType),
      value: z.string().min(5)
    })
  )
})
