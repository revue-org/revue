db = new Mongo().getDB('notification')
db.createCollection('notification')

db.notification.insertMany([
  {
    id: 'test-notification-id',
    type: 'outlier',
    timestamp: new Date(),
    event: {
      id: 'test-event-id',
      rangeRuleId: 'test-range-rule-id',
      measurementId: 'test-measurement-id'
    },
    message: 'test-message'
  }
])
