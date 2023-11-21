const IntrusionSchema = new Schema({
    _id: Number,
    deviceId: {
        type: String,
        code: String
    },
    timestamp: Date,
    intrusionObject: String
});