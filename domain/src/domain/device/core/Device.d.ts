import { DeviceId } from './DeviceId';
export interface Device {
    getDeviceId(): DeviceId;
    getIpAddress(): string;
    isCapturing(): boolean;
    startCapturing(): void;
    stopCapturing(): void;
}
