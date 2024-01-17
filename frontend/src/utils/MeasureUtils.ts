import { MeasureUnit } from "@domain/device/core/impl/enum/MeasureUnit";
import { Measure } from "@domain/device/core/impl/enum/Measure";

export const getMeasureColor = (measure: Measure) => {
  switch (measure) {
    case Measure.TEMPERATURE:
      return "red";
    case Measure.PRESSURE:
      return "orange";
    case Measure.HUMIDITY:
      return "teal";
  }
};
export const getMeasureAcronym = (unit: MeasureUnit) => {
  switch (unit) {
    case MeasureUnit.PASCAL:
      return "Pa";
    case MeasureUnit.BAR:
      return "bar";
    case MeasureUnit.CELSIUS:
      return "°C";
    case MeasureUnit.FARENHEIT:
      return "°F";
    case MeasureUnit.KELVIN:
      return "K";
    case MeasureUnit.PERCENTAGE:
      return "%";
  }
};
