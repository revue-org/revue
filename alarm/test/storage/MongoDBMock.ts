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
  await notificationModel
    .createCollection()
    .then(() => console.log('Created notificationModel collection'))
  await notificationModel
    .create(notificationSample)
    .then(() => console.log('Created notificationModel document'))
}

export const populateAnomalies = async (): Promise<void> => {
  await exceedingModel.createCollection().then(() => console.log('Created exceedings collection'))
  await exceedingModel
    .create(exceedingSample)
    .then(() => console.log('Created exceedingModel document'))
  await intrusionModel
    .create(intrusionSample)
    .then(() => console.log('Created intrusionModel document'))
}

export const populateRecognizingNodes = async (): Promise<void> => {
  await recognizingNodeModel
    .createCollection()
    .then(() => console.log('Created recognizingNodeModel collection'))
  await recognizingNodeModel
    .create(recognizingNodeSample)
    .then(() => console.log('Created recognizingNodeModel document'))
}

export const populateSecurityRules = async (): Promise<void> => {
  await exceedingRuleModel
    .createCollection()
    .then(() => console.log('Created security rules collection'))
  await exceedingRuleModel
    .create(exceedingRuleSample)
    .then(() => console.log('Created exceedingRuleModel document'))
  await intrusionRuleModel
    .create(intrusionRuleSample)
    .then(() => console.log('Created intrusionRuleModel document'))
}
