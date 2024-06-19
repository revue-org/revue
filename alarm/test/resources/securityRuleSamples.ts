import { Types } from 'mongoose'

export const rangeRuleSample = {
  id: 'first-range-rule',
  type: 'range',
  creatorId: 'test-creator-id', // 24 chars like an ObjectId
  activeOn: 'cam-01',
  description: 'This is a sample range rule description',
  validity: {
    from: '2020-01-01',
    to: '2020-01-02'
  },
  contacts: [
    {
      type: 'sms',
      value: '3333333333'
    },
    {
      type: 'email',
      value: 'testmail@gmail.com'
    }
  ],
  data: {
    min: 0,
    max: 89,
    measure: {
      type: 'temperature',
      unit: 'celsius'
    }
  },
  enabled: true
}

export const intrusionRuleSample = {
  id: 'first-intrusion-rule',
  type: 'intrusion',
  creatorId: 'test-user-id',
  activeOn: 'test-device-id',
  description: 'This is a sample intrusion rule description',
  validity: {
    from: '2020-01-01',
    to: '2020-01-02'
  },
  contacts: [
    {
      type: 'sms',
      value: '3333333333'
    },
    {
      type: 'email',
      value: 'testmail@gmail.com'
    }
  ],
  data: {
    objectClass: 'person'
  },
  enabled: true
}
