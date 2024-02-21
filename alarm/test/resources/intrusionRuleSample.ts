import { Types } from 'mongoose'

export const intrusionRuleSample = {
  deviceId: {
    type: 'CAMERA',
    code: 'cam-01'
  },
  creatorId: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'), // 24 chars like an ObjectId
  contactsToNotify: [
    {
      type: 'SMS',
      value: '3333333333'
    }
  ],
  description: 'This is a sample intrusion rule description',
  objectClass: 'PERSON',
  from: '2020-01-01T00:00:00.000Z',
  to: '2020-01-02T00:00:00.000Z'
}
