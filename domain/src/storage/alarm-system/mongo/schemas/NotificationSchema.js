import {Schema, model} from "mongoose";

export const notificationModel = new model('Notification', new Schema({
    _id: Number,
    anomalyId: Number,
    anomalyType: String,
    timestamp: Date
}));