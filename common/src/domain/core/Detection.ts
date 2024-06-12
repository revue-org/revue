import { DeviceEvent } from "./DeviceEvent";

export interface Detection extends DeviceEvent {

  get objectClass(): string;

}