import {Schema, model} from "mongoose";

export const exceedingModel = new model('ExceedingRule', new Schema({
    _id: Number,
    deviceId: {
        type: String,
        code: String
    },
    creatorId: Number,
    description: String,
    minValue: Number,
    maxValue: Number,
    measure: String,
    contacts: [{
        value: String,
        type: String
    }],
    from: Date,
    to: Date
}));