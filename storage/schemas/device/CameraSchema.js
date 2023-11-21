const CameraSchema = new Schema({
    _id: {
        type: String,
        code: String
    },
    ipAddress: String,
    resolution: {
        height: Number,
        width: Number
    }
});