db = new Mongo().getDB('log')

db.createCollection('numericMeasurement')
db.createCollection('anomaly')

db.anomaly.insertMany([
  {
    id: 'anomaly-outlier-1',
    type: 'outlier',
    timestamp: new Date('2021-05-01T00:00:00Z'),
    data: {
      type: 'measurement',
      sourceDeviceId: 'device-1',
      timestamp: new Date('2021-05-01T00:00:00Z'),
      measurementId: 'measurement-1',
      measure: {
        type: 'temperature',
        unit: 'celsius'
      },
      value: 100,
      rangeRuleId: 'range-rule-1'
    }
  },
  {
    id: 'anomaly-intrusion-1',
    type: 'intrusion',
    timestamp: new Date('2021-05-01T00:00:00Z'),
    data: {
      type: 'detection',
      sourceDeviceId: 'device-1',
      timestamp: new Date('2021-05-01T00:00:00Z'),
      detectionId: 'detection-1',
      objectClass: 'person',
      intrusionRuleId: 'intrusion-rule-1'
    }
  }
])

db.numericMeasurement.insertMany([
  {
    id: 'measurement-1',
    timestamp: new Date('2021-05-01T00:00:00Z'),
    sourceDeviceId: 'device-1',
    measure: {
      type: 'temperature',
      unit: 'celsius'
    },
    value: 100
  },
  {
    id: 'measurement-2',
    timestamp: new Date('2021-05-01T00:00:00Z'),
    sourceDeviceId: 'device-1',
    measure: {
      type: 'temperature',
      unit: 'celsius'
    },
    value: 100
  }
])
