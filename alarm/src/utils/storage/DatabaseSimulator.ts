import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb'
import { exceedingModel, intrusionModel } from '../../controller/anomaly.js'
import { exceedingRuleModel, intrusionRuleModel } from '../../controller/securityRule.js'
import { notificationModel } from '../../controller/notification.js'
import { recognizingNodeModel } from '../../controller/recognizingNode.js'
import { notificationSample } from '../../../test/resources/notificationSample.js'
import { recognizingNodeSample } from '../../../test/resources/recognizingNodeSample.js'
import * as console from 'console'
import { exceedingRuleSample } from '../../../test/resources/exceedingRuleSample.js'
import mongoose from 'mongoose'
import { intrusionRuleSample } from '../../../test/resources/intrusionRuleSample'
import { exceedingSample } from '../../../test/resources/exceedingSample'
import { intrusionSample } from '../../../test/resources/intrusionSample'

export class DatabaseSimulator {
  private static mongoContainer: StartedMongoDBContainer

  static connectionString(): string {
    return this.mongoContainer.getConnectionString()
  }

  static async simulate(): Promise<void> {
    console.log('Simulating MongoDB instance...')
    this.mongoContainer = await new MongoDBContainer('mongo:6.0.1')
      .withEnvironment({ MONGO_INITDB_DATABASE: 'alarm' })
      .withExposedPorts(27017)
      .start()
  }

  static async createCollections(): Promise<void> {
    console.log('Populating MongoDB instance...')
    await exceedingRuleModel.createCollection()
    await notificationModel.createCollection()
    await recognizingNodeModel.createCollection()
    await exceedingRuleModel.createCollection()
  }

  static async populate(): Promise<void> {
    console.log('Populating MongoDB instance...')
    const conn = mongoose.createConnection(this.mongoContainer.getConnectionString(), {
          directConnection: true
        })
    await exceedingRuleModel.create(exceedingRuleSample)
    await intrusionRuleModel.create(intrusionRuleSample)
    await exceedingModel.create(exceedingSample)
    await intrusionModel.create(intrusionSample)
    await notificationModel.create(notificationSample)
    await recognizingNodeModel.create(recognizingNodeSample)

  }

  static async clean(): Promise<void> {
    console.log('Cleaning MongoDB instance...')
    let conn = mongoose.createConnection(this.mongoContainer.getConnectionString(), {
      directConnection: true
    })
    await exceedingRuleModel.deleteMany({})
    await intrusionRuleModel.deleteMany({})
    await exceedingModel.deleteMany({})
    await intrusionModel.deleteMany({})
    await notificationModel.deleteMany({})
    await recognizingNodeModel.deleteMany({})
  }

  static async destroy(): Promise<void> {
    console.log('Destroying MongoDB instance...')
    await this.mongoContainer.stop()
  }
}
