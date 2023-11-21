const RecognizingNodeSchema = new Schema({
    _id: Number,
    ipAddress: String,
    deviceIds: [{
        type: String,
        code: String
    }]
});