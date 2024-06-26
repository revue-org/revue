import { Measure } from '../core/Measure.js'
import { MeasureType } from '../core/MeasureType.js'
import { MeasureUnit } from '../core/MeasureUnit.js'

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

  static createMeasure(type: MeasureType, unit: MeasureUnit): Measure {
    switch (type) {
      case MeasureType.TEMPERATURE:
        checkMeasureUnit(unit, [MeasureUnit.CELSIUS, MeasureUnit.FAHRENHEIT])
        return MeasureFactory.createTemperatureMeasure(unit)
      case MeasureType.HUMIDITY:
        checkMeasureUnit(unit, [MeasureUnit.PERCENTAGE])
        return MeasureFactory.createHumidityMeasure(unit)
      case MeasureType.PRESSURE:
        checkMeasureUnit(unit, [MeasureUnit.PASCAL, MeasureUnit.BAR])
        return MeasureFactory.createPressureMeasure(unit)
      default:
        throw new Error('Invalid measure type')
    }
  }
}

function checkMeasureUnit(unit: MeasureUnit, validUnits: MeasureUnit[]): void {
  if (!validUnits.includes(unit)) {
    throw new Error('Invalid measure unit')
  }
}
