import {Schema, model} from "mongoose";

const exceedingModel= new model('Exceeding', new Schema({
    _id: Number,
    deviceId: {
        type: String,
        code: String
    },
    timestamp: Date,
    value: Number,
    measure: String
}));