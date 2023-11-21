const NotificationSchema = new Schema({
    _id: Number,
    anomalyId: Number,
    anomalyType: String,
    timestamp: Date
});