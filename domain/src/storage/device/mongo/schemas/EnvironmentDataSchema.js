import {Schema, model} from "mongoose";

export const environmentDataModel = new model('EnvironmentData', new Schema({
    _id: String,
    deviceId: {
        type: String,
        code: String
    },
    value: Number,
    measure: String,
    timestamp: Date
}));