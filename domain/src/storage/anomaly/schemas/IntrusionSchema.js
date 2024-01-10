import { Schema } from 'mongoose'
import { deviceIdSchema } from "../../device/schemas/DeviceIdSchema.js";

export const intrusionSchema = new Schema({
  deviceId: {
    type: deviceIdSchema,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  intrusionObject: {
    type: String,
    enum: ['PERSON', 'ANIMAL', 'VEHICLE', 'OTHER'],
    required: true
  }
})

/*
*   createExceeding(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    value: number,
    measure: Measure
  ): Exceeding {
    return new ExceedingImpl(anomalyId, deviceId, timestamp, value, measure)
  }

  createIntrusion(
    anomalyId: string,
    deviceId: DeviceId,
    timestamp: Date,
    intrusionObject: ObjectClass
  ): Intrusion {
    return new IntrusionImpl(anomalyId, deviceId, timestamp, intrusionObject)
  }*/
