import {Anomaly} from "./Anomaly";
import {ObjectClass} from "./ObjectClass";

export interface Intrusion extends Anomaly {
    getIntrusionObject(): ObjectClass;
}
