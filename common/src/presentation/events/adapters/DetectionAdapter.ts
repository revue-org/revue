import { detectionSchema } from '../schemas/DetectionSchema'
import { Detection } from '../../../domain/core'

export class DetectionsAdapter {
  static asDomainEvent(detectionObj: object): Detection {
    return detectionSchema.parse(detectionObj)
  }

  static asMessage(detection: Detection): object {
    return { ...detection }
  }
}
