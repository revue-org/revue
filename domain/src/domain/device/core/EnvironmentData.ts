import {DeviceId} from "./DeviceId";
import {Measure} from "./Measure";

export interface EnvironmentData {
    getSourceDeviceId(): DeviceId;

    getValue(): number;

    getMeasure(): Measure;

    getTimestamp(): Date;
}
