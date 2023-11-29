import { DeviceType } from './DeviceType';
export interface DeviceId {
    getType(): DeviceType;
    getCode(): string;
}
