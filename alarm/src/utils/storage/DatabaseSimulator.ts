import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";
import { exceedingModel, intrusionModel } from "../../controller/anomaly.js";
import { exceedingRuleModel, intrusionRuleModel } from "../../controller/securityRule.js";
import { notificationModel } from "../../controller/notification.js";
import { recognizingNodeModel } from "../../controller/recognizingNode.js";
import { notificationSample } from "../../utils/storage/sampleData/notificationSample.js";
import { recognizingNodeSample } from "../../utils/storage/sampleData/recognizingNodeSample.js";
import * as console from "console";
import { exceedingRuleSample } from "../../utils/storage/sampleData/exceedingRuleSample.js";
import mongoose from "mongoose";
import { intrusionRuleSample } from "../../utils/storage/sampleData/intrusionRuleSample";
import { exceedingSample } from "../../utils/storage/sampleData/exceedingSample";
import { intrusionSample } from "../../utils/storage/sampleData/intrusionSample";

export class DatabaseSimulator {
  private static mongoContainer: StartedMongoDBContainer;

  static connectionString(): string {
    return this.mongoContainer.getConnectionString();
  }

  static async simulate(): Promise<void> {
    console.log("Simulating MongoDB instance...");
    this.mongoContainer = await new MongoDBContainer("mongo:6.0.1").withExposedPorts(27017).start();
  }

  static async createCollections(): Promise<void> {
    console.log("Populating MongoDB instance...");
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/alarm", {
      directConnection: true
    });
    await exceedingRuleModel.createCollection().then(() => console.log("Collection securityRule created!"));
    await notificationModel.createCollection();
    await recognizingNodeModel.createCollection();
    await exceedingRuleModel.createCollection()
    await conn.disconnect();
  }

  static async populate(): Promise<void> {
    console.log("Populating MongoDB instance...");
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/alarm", {
      directConnection: true
    });

    await exceedingRuleModel.create(exceedingRuleSample);
    await intrusionRuleModel.create(intrusionRuleSample);
    await exceedingModel.create(exceedingSample);
    await intrusionModel.create(intrusionSample);
    await notificationModel.create(notificationSample);
    await recognizingNodeModel.create(recognizingNodeSample);

    console.log(await exceedingRuleModel.find().orFail());
    console.log(await intrusionRuleModel.find().orFail());
    console.log(await exceedingModel.find().orFail());
    console.log(await intrusionModel.find().orFail());
    console.log(await notificationModel.find().orFail());
    console.log(await notificationModel.find().orFail());
    console.log(await recognizingNodeModel.find().orFail());
    await conn.disconnect();

    /*intrusionModel.createCollection().then(async function (collection): Promise<void> {
  console.log('Collection intrusion created!')
  await intrusionModel
    .create({
      deviceId: {
        type: 'CAMERA',
        code: 'poro'
      },
      timestamp: new Date(),
      intrusionObject: 'PERSON'
    })
    .catch((err): void => {
      throw err
    })

  console.log(await intrusionModel.find().orFail())
})*/
  }

  static async clean(): Promise<void> {
    console.log("Cleaning MongoDB instance...");
  }

  static async destroy(): Promise<void> {
    console.log("Destroying MongoDB instance...");
    //await mongoose.disconnect();
    await this.mongoContainer.stop();
  }
}
