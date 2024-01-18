import { MongoDBContainer, StartedMongoDBContainer } from "@testcontainers/mongodb";
import { Wait } from "testcontainers";
import { intrusionSchema } from "domain/dist/storage/anomaly/schemas/IntrusionSchema";
import { exceedingSchema } from "domain/dist/storage/anomaly/schemas/ExceedingSchema";
import { Exceeding } from "domain/dist/domain/anomaly/core/Exceeding";
import { Intrusion } from "domain/dist/domain/anomaly/core/Intrusion";
import mongoose, { model, Model } from "mongoose";

export class DatabaseSimulator {

  private static mongoContainer: StartedMongoDBContainer;

  static async mongoSimulation(): Promise<void> {
   console.log("Simulating MongoDB instance...")
    this.mongoContainer = await new MongoDBContainer()
      .withExposedPorts(27017)
      .withWaitStrategy(Wait.forLogMessage('waiting for connections on port 27017', 1))
      .start()
  }

  static async mongoPopulate(): Promise<void> {
    console.log("Populating MongoDB instance...")

    const exceedingModel: Model<Exceeding> = model<Exceeding>('Exceeding', exceedingSchema, 'anomaly')
    const intrusionModel: Model<Intrusion> = model<Intrusion>('Intrusion', intrusionSchema, 'anomaly')
    exceedingModel.createCollection().then(function (collection): void {
      console.log('Collection exceeding created!');
    });
  }

  static async mongoClean(): Promise<void> {
    console.log("Cleaning MongoDB instance...")
  }

  static async mongoDestroy(): Promise<void> {
    console.log("Destroying MongoDB instance...")
    //await mongoose.disconnect();
    await this.mongoContainer.stop();
  }
}
