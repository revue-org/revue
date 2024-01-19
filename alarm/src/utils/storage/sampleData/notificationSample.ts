import { Types } from 'mongoose'

export const notificationSample = {
  anomalyId: new Types.ObjectId('aaaaaaaaaaaaaaaaaaaaaaaa'), // 24 chars like an ObjectId
  anomalyType: 'EXCEEDING',
  timestamp: '2020-01-01T00:00:00.000Z'
}
