import { Measure } from '../core/Measure'
import { MeasureType } from '../core/MeasureType'
import { MeasureUnit } from '../core/MeasureUnit'

export class MeasureFactory {

  static createTemperatureMeasure(unit: MeasureUnit): Measure {
    checkMeasureUnit(unit, [MeasureUnit.CELSIUS, MeasureUnit.FAHRENHEIT])
    return {
      type: MeasureType.TEMPERATURE,
      unit: unit
    }
  }

  static createHumidityMeasure(unit: MeasureUnit): Measure {
    checkMeasureUnit(unit, [MeasureUnit.PERCENTAGE])
    return {
      type: MeasureType.HUMIDITY,
      unit: unit
    }
  }

  static createPressureMeasure(unit: MeasureUnit): Measure {
    checkMeasureUnit(unit, [MeasureUnit.PASCAL, MeasureUnit.BAR])
    return {
      type: MeasureType.PRESSURE,
      unit: unit
    }
  }

}

function checkMeasureUnit(unit: MeasureUnit, validUnits: MeasureUnit[]): void {
  if (!validUnits.includes(unit)) {
    throw new Error('Invalid measure unit')
  }
}
