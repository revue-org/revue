import { Measurement } from "./Measurement";
import { MeasureType } from "./MeasureType";

export interface NumericMeasurement extends Measurement {

  measureType: MeasureType

  value: number

}