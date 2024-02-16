import { MeasureUnit } from '../domain/device/core/impl/enum/MeasureUnit.js'

export class MeasureUnitConverter {
  static convertToMeasureUnit(measureUnit: string): MeasureUnit {
    switch (measureUnit.toUpperCase()) {
      case 'PASCAL':
        return MeasureUnit.PASCAL
      case 'BAR':
        return MeasureUnit.BAR
      case 'CELSIUS':
        return MeasureUnit.CELSIUS
      case 'FAHRENHEIT':
        return MeasureUnit.FAHRENHEIT
      case 'KELVIN':
        return MeasureUnit.KELVIN
      case 'PERCENTAGE':
        return MeasureUnit.PERCENTAGE
      default:
        throw new Error('Measure unit not found')
    }
  }

  static convertToString(measureUnit: MeasureUnit): string {
    switch (measureUnit) {
      case MeasureUnit.PASCAL:
        return 'PASCAL'
      case MeasureUnit.BAR:
        return 'BAR'
      case MeasureUnit.CELSIUS:
        return 'CELSIUS'
      case MeasureUnit.FAHRENHEIT:
        return 'FAHRENHEIT'
      case MeasureUnit.KELVIN:
        return 'KELVIN'
      case MeasureUnit.PERCENTAGE:
        return 'PERCENTAGE'
      default:
        throw new Error('Measure unit not found')
    }
  }
}
