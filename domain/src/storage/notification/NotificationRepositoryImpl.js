export class NotificationRepositoryImpl {
  notificationModel
  constructor(notificationModel) {
    this.notificationModel = notificationModel
  }
  getNotifications() {
    return this.notificationModel.find().orFail()
  }
  async getNotificationById(notificationId) {
    return this.notificationModel.findById(notificationId).orFail()
  }
  async insertExceedingNotification(notification) {
    let anomalyType = 'EXCEEDING'
    return await this.notificationModel
      .create({
        anomalyId: notification.anomaly.anomalyId,
        anomalyType: anomalyType,
        timestamp: notification.timestamp
      })
      .then(notification => {
        return notification._id.toString()
      })
      .catch(err => {
        throw err
      })
  }
  async insertIntrusionNotification(notification) {
    let anomalyType = 'INTRUSION'
    return await this.notificationModel
      .create({
        anomalyId: notification.anomaly.anomalyId,
        anomalyType: anomalyType,
        timestamp: notification.timestamp
      })
      .then(notification => {
        return notification._id.toString()
      })
      .catch(err => {
        throw err
      })
  }
  async updateExceedingNotification(notification) {
    let anomalyType = 'EXCEEDING'
    await this.notificationModel.findByIdAndUpdate(notification.notificationId, {
      anomalyType: anomalyType,
      timestamp: new Date()
    })
  }
  async updateIntrusionNotification(notification) {
    let anomalyType = 'INTRUSION'
    await this.notificationModel.findByIdAndUpdate(notification.notificationId, {
      anomalyType: anomalyType,
      timestamp: new Date()
    })
  }
  async deleteNotification(notificationId) {
    await this.notificationModel.deleteOne({ _id: notificationId }).orFail()
  }
}
