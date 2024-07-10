import { detectionSchema } from './schemas/DetectionSchema.js'
import { Detection } from '../domain/core'

export class DetectionPresenter {
  static asDomainEvent(detectionObj: object): Detection {
    return detectionSchema.parse(detectionObj)
  }

  static asMessage(detection: Detection): object {
    return { ...detection }
  }
}
