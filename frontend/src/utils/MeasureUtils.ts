import { MeasureType } from 'common/dist/domain/core'

export const colorMap = {
  [MeasureType.TEMPERATURE]: 'red',
  [MeasureType.HUMIDITY]: 'teal',
  [MeasureType.PRESSURE]: 'orange'
} /*
import { MeasureUnit } from '@domain/device/core/impl/enum/MeasureUnit'
import { Measure } from '@domain/device/core/impl/enum/Measure'

export const getMeasureColor = (measure: Measure) => {
  switch (measure) {
    case Measure.TEMPERATURE:
      return 'red'
    case Measure.PRESSURE:
      return 'orange'
    case Measure.HUMIDITY:
      return 'teal'
  }
}
export const getMeasureAcronym = (unit: MeasureUnit) => {
  switch (unit) {
    case MeasureUnit.PASCAL:
      return 'Pa'
    case MeasureUnit.BAR:
      return 'bar'
    case MeasureUnit.CELSIUS:
      return '°C'
    case MeasureUnit.FAHRENHEIT:
      return '°F'
    case MeasureUnit.KELVIN:
      return 'K'
    case MeasureUnit.PERCENTAGE:
      return '%'
  }
}
*/
