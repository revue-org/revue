import { Types } from 'mongoose'

export const cameraSample = {
  _id: {
    type: 'CAMERA',
    code: 'cam-01'
  },
  isCapturing: false,
  ipAddress: '192.168.1.1',
  resolution: {
    height: 200,
    width: 200
  }
}
