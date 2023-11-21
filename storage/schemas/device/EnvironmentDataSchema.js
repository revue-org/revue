const EnvironmentDataSchema = new Schema({
    _id: String,
    deviceId: {
        type: String,
        code: String
    },
    value: Number,
    measure: String,
    timestamp: Date
});