import { DeviceType } from './impl/enum/DeviceType.js';
export interface DeviceId {
    get type(): DeviceType;
    set type(type: DeviceType);
    get code(): string;
    set code(code: string);
}
