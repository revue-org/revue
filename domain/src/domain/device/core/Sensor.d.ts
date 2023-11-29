import { Device } from './Device';
import { Measure } from './Measure';
export interface Sensor extends Device {
    getIntervalMillis(): number;
    getMeasures(): Set<Measure>;
    addMeasure(): void;
    sendEnvironmentData(): void;
}
