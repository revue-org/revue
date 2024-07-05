export const measurementSample = {
  id: 'test-id',
  sourceDeviceId: 'test-source-device-id',
  measure: {
    type: 'test-type',
    unit: 'test-unit'
  },
  value: 10,
  timestamp: '2021-09-01T20:00:00.000Z'
}

export const intrusionSample = {
  id: 'test-id-1',
  type: 'intrusion',
  timestamp: '2021-09-01T21:00:00.000Z',
  data: {
    detectionId: 'test-detection-id',
    intrusionRuleId: 'test-intrusion-rule-id'
  }
}

export const outlierSample = {
  id: 'test-id-2',
  type: 'outlier',
  timestamp: '2021-09-01T21:00:00.000Z',
  data: {
    measurementId: 'test-measurement-id',
    intrusionRuleId: 'test-intrusion-rule-id'
  }
}
