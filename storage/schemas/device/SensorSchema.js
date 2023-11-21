const SensorSchema = new Schema({
    _id: {
        type: String,
        code: String
    },
    ipAddress: String,
    intervalMillis: Number,
    measures: [String]
});