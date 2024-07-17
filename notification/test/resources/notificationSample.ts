export const outlierSample = {
  id: 'outlier-notification-test-id',
  type: 'outlier',
  timestamp: '2020-01-01T10:00:00.000Z',
  event: {
    id: 'outlier-test-id',
    measurementId: 'measurement-test-id',
    type: 'outlier',
    timestamp: '2020-01-01T10:00:00.000Z',
    measure: {
      type: 'temperature',
      unit: 'celsius'
    },
    sourceDeviceId: 'source-device-test-id',
    rangeRuleId: 'range-rule-test-id',
    value: 10
  },
  message: 'outlier-test-message'
}

export const intrusionSample = {
  id: 'intrusion-notification-test-id',
  type: 'intrusion',
  timestamp: '2020-01-01T10:00:00.000Z',
  event: {
    id: 'intrusion-test-id',
    type: 'intrusion',
    timestamp: '2020-01-01T10:00:00.000Z',
    sourceDeviceId: 'source-device-test-id',
    intrusionRuleId: 'intrusion-rule-test-id',
    detectionId: 'detection-test-id',
    objectClass: 'person'
  },
  message: 'intrusion-test-message'
}
