import {Schema, model} from "mongoose";

export const sensorModel = new model('Sensor', new Schema({
    _id: {
        type: String,
        code: String
    },
    ipAddress: String,
    intervalMillis: Number,
    measures: [String]
}));