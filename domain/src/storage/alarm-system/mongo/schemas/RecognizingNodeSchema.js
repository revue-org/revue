import {Schema, model} from "mongoose";

export const recognizingNodeModel = new model('RecognizingNode', new Schema({
    _id: Number,
    ipAddress: String,
    deviceIds: [{
        type: String,
        code: String
    }]
}));