import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { exceedingRuleModel, intrusionRuleModel } from '../../src/controller/securityRule.js'
import { notificationModel } from '../../src/controller/notification.js'
import { recognizingNodeModel } from '../../src/controller/recognizingNode.js'
import { exceedingRuleSample } from '../resources/exceedingRuleSample.js'
import { intrusionRuleSample } from '../resources/intrusionRuleSample.js'
import { exceedingModel, intrusionModel } from '../../src/controller/anomaly.js'
import { exceedingSample } from '../resources/exceedingSample.js'
import { intrusionSample } from '../resources/intrusionSample.js'
import { notificationSample } from '../resources/notificationSample.js'
import { recognizingNodeSample } from '../resources/recognizingNodeSample.js'

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

export const populateNotifications = async (): Promise<void> => {
  await notificationModel.createCollection()
  await notificationModel.create(notificationSample)
}

export const populateAnomalies = async (): Promise<void> => {
  await exceedingModel.createCollection()
  await exceedingModel.create(exceedingSample)
  await intrusionModel.create(intrusionSample)
}

export const populateRecognizingNodes = async (): Promise<void> => {
  await recognizingNodeModel.createCollection()
  await recognizingNodeModel.create(recognizingNodeSample)
}

export const populateSecurityRules = async (): Promise<void> => {
  await exceedingRuleModel.createCollection()
  await exceedingRuleModel.create(exceedingRuleSample)
  await intrusionRuleModel.create(intrusionRuleSample)
}
