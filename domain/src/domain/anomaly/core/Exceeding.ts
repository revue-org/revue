import {Anomaly} from "./Anomaly";

export interface Exceeding extends Anomaly {
    getExceedingValue(): number;
}
