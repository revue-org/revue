export const outlierSample = {
  id: 'outlier-test-id',
  type: 'outlier',
  timestamp: '2020-01-01T10:00:00.000Z',
  event: {
    id: 'domain-event-test-id-1',
    rangeRuleId: 'range-rule-test-id',
    measurementId: 'measurement-test-id'
  },
  message: 'outlier-test-message'
}

export const intrusionSample = {
  id: 'intrusion-test-id',
  type: 'intrusion',
  timestamp: '2020-01-01T10:00:00.000Z',
  event: {
    id: 'domain-event-test-id-2',
    intrusionRuleId: 'intrusion-rule-test-id',
    detectionId: 'detection-test-id'
  },
  message: 'intrusion-test-message'
}
