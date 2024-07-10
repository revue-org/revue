db = new Mongo().getDB('notification')
db.createCollection('notification')

db.notification.insertMany([
  {
    id: 'test-range-notification-id',
    type: 'outlier',
    timestamp: new Date(),
    event: {
      type: 'measurement',
      timestamp: new Date(),
      sourceDeviceId: 'test-source-device-id',
      measurementId: 'test-measurement-id',
      measure: {
        type: 'temperature',
        unit: 'celsius'
      },
      value: 20,
      rangeRuleId: 'test-range-rule-id'
    },
    message: 'test-range-message'
  },
  {
    id: 'test-intrusion-notification-id',
    type: 'intrusion',
    timestamp: new Date(),
    event: {
      type: 'detection',
      timestamp: new Date(),
      sourceDeviceId: 'test-source-device-id',
      detectionId: 'test-detection-id',
      objectClass: 'person',
      intrusionRuleId: 'test-intrusion-rule-id'
    },
    message: 'test-intrusion-message'
  }
])
