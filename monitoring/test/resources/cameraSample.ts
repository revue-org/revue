import { Types } from 'mongoose'

export const cameraSample = {
  _id: {
    type: "CAMERA",
    code: "cam-01"
  },
  ipAddress: "192.168.1.1",
  resolution: {
    height: 200,
    width: 200
  }
}