import { DeviceEvent } from "./DeviceEvent";
import { MeasureType } from "./MeasureType";

export interface Measurement extends DeviceEvent {

  get measureType(): MeasureType;

  get value(): any;

}