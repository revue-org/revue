import { AnomalyType } from '../domain/anomaly/core/impl/enum/AnomalyType.js'

export class AnomalyTypeConverter {
  static convertToAnomalyType(type: string): AnomalyType {
    switch (type.toUpperCase()) {
      case 'EXCEEDING':
        return AnomalyType.EXCEEDING
      case 'INTRUSION':
        return AnomalyType.INTRUSION
      default:
        throw new Error('Anomaly type not found')
    }
  }

  static convertToString(type: AnomalyType): string {
    switch (type) {
      case AnomalyType.EXCEEDING:
        return 'EXCEEDING'
      case AnomalyType.INTRUSION:
        return 'INTRUSION'
      default:
        throw new Error('Anomaly type not found')
    }
  }
}
