import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { exceedingRuleSample } from '../resources/exceedingRuleSample.js'
import { intrusionRuleSample } from '../resources/intrusionRuleSample.js'
import { exceedingModel, intrusionModel, exceedingRuleModel, intrusionRuleModel } from '../../src/init.js'
import { exceedingSample } from '../resources/exceedingSample.js'
import { intrusionSample } from '../resources/intrusionSample.js'

let mongoMock: any = null

export const connectToMock = async (): Promise<void> => {
  try {
    mongoMock = await MongoMemoryServer.create()
    await mongoose.connect(mongoMock.getUri(), {
      directConnection: true
    })
  } catch (err) {
    throw err
  }
}

export const disconnectFromMock = async (): Promise<void> => {
  try {
    await mongoose.connection.close()
    if (mongoMock) {
      await mongoMock.stop()
    }
  } catch (err) {
    throw err
  }
}

export const populateAnomalies = async (): Promise<void> => {
  await exceedingModel.createCollection()
  await exceedingModel.create(exceedingSample)
  await intrusionModel.create(intrusionSample)
}
export const populateSecurityRules = async (): Promise<void> => {
  await exceedingRuleModel.createCollection()
  await exceedingRuleModel.create(exceedingRuleSample)
  await intrusionRuleModel.create(intrusionRuleSample)
}
