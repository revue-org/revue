db = new Mongo().getDB('notification')
db.createCollection('notification')

db.notification.insertMany([
  {
    id: 'test-outlier-notification-id',
    type: 'outlier',
    timestamp: new Date(),
    event: {
      id: 'test-event-id',
      rangeRuleId: 'test-range-rule-id',
      measurementId: 'test-measurement-id'
    },
    message: 'test-message'
  },
  {
    id: 'test-intrusion-notification-id',
    type: 'intrusion',
    timestamp: new Date(),
    event: {
      id: 'test-event-id',
      intrusionRuleId: 'test-intrusion-rule-id',
      detectionId: 'test-detection-id'
    },
    message: 'test-message'
  }
])
