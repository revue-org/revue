import {Schema, model} from "mongoose";

export const userModel = new model('User', new Schema({
    _id: Number,
    name: String,
    surname: String,
    contact: {
        value: String,
        type: String
    }
}));