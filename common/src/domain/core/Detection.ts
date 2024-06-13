import { DeviceEvent } from "./DeviceEvent";

export interface Detection extends DeviceEvent {

  readonly objectClass: string;

}