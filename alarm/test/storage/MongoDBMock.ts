import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { rangeRuleSample, intrusionRuleSample } from '../resources/securityRuleSamples.js'
import { SecurityRuleDBEntity } from '@/infrastructure/storage/models/SecurityRuleModel.js'
import { securityRuleSchema } from '@/infrastructure/storage/schemas/SecurityRuleSchema.js'

let mongoMock: any = null

export const connectToMock = async (): Promise<void> => {
  mongoMock = await MongoMemoryServer.create()
  await mongoose.connect(mongoMock.getUri(), {
    directConnection: true
  })
}

export const disconnectFromMock = async (): Promise<void> => {
  await mongoose.connection.close()
  if (mongoMock) {
    await mongoMock.stop()
  }
}

export const populateSecurityRules = async (): Promise<void> => {
  const model = mongoose.model<SecurityRuleDBEntity>(
    'SecurityRuleSchema',
    securityRuleSchema,
    'securityRules'
  )
  await model.create(rangeRuleSample)
  await model.create(intrusionRuleSample)
}
